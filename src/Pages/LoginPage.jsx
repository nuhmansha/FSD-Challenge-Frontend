import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Instance/axiosInstance';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, setSubmitting, setErrors) => {
    try {
      const response = await axiosInstance.post("/login", values);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token stored in localStorage:", response.data.token);
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ server: error.response.data.message });
      }
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      handleLogin(values, setSubmitting, setErrors);
    },
  });

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  return (
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
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        {formik.errors.server && (
          <div className="text-red-500 text-sm">{formik.errors.server}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-700"
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
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
