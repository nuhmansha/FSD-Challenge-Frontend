import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Instance/axiosInstance";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../Context/AuthContext";
import { PiNotepadBold } from "react-icons/pi"; // Ensure you have the correct icon import

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values, setSubmitting, setErrors) => {
    try {
      const response = await axiosInstance.post("/login", values);
      if (response.data.token) {
        console.log("JWT Token:", response.data.token);
        localStorage.setItem("token", response.data.token);
        login(response.data.token); // Set the user in the context
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.message });
      }
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      handleLogin(values, setSubmitting, setErrors);
    },
  });

  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;
    console.log(credential, "cr");
    axiosInstance
      .post("/google-login", { idToken: credential })
      .then((response) => {
        console.log("Google login successful:", response.data);
        login(response.data.token); // Set the user in the context
        navigate("/"); // Redirect to home page after successful login
      })
      .catch((error) => {
        console.error("There was an error with Google signup!", error);
      });
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <div>
      <nav className="bg-blue-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PiNotepadBold className="text-white text-2xl" />
        </div>
        <div>
          <Link
            to="/login"
            className="text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Signup
          </Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-blue-500">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full p-2 border rounded"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-2 border rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          {formik.errors.server && (
            <div className="text-red-500 text-sm">{formik.errors.server}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
            disabled={formik.isSubmitting}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
