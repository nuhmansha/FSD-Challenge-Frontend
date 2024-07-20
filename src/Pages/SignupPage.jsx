// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axiosInstance from "../../src/Instance/axiosInstance";
// import { useNavigate, Link } from "react-router-dom";

// const SignupPage = () => {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("Required"),
//       lastName: Yup.string().required("Required"),
//       email: Yup.string().email("Invalid email").required("Required"),
//       password: Yup.string()
//         .min(8, "Password must be at least 8 characters")
//         .required("Required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Required"),
//     }),
//     onSubmit: (values, { setSubmitting }) => {
//         console.log(values,'value');
//       axiosInstance
//         .post("/signup", values)
        
//         .then((response) => {
//           console.log("Signup successful:", response.data);
//           navigate("/login");
//         })
//         .catch((error) => {
//           console.error("There was an error signing up!", error);
//         })
//         .finally(() => {
//           setSubmitting(false);
//         });
//     },
//   });

//   const handleGoogleSignup = () => {
//     // Implement Google signup logic here
//     console.log("Google signup clicked");
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-blue-500">
//       <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <div>
//           <input
//             name="firstName"
//             type="text"
//             placeholder="First Name"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.firstName}
//             className="w-full p-2 border rounded"
//           />
//           {formik.touched.firstName && formik.errors.firstName ? (
//             <div className="text-red-500 text-sm">
//               {formik.errors.firstName}
//             </div>
//           ) : null}
//         </div>
//         <div>
//           <input
//             name="lastName"
//             type="text"
//             placeholder="Last Name"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.lastName}
//             className="w-full p-2 border rounded"
//           />
//           {formik.touched.lastName && formik.errors.lastName ? (
//             <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
//           ) : null}
//         </div>
//         <div>
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//             className="w-full p-2 border rounded"
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <div className="text-red-500 text-sm">{formik.errors.email}</div>
//           ) : null}
//         </div>
//         <div>
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.password}
//             className="w-full p-2 border rounded"
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <div className="text-red-500 text-sm">{formik.errors.password}</div>
//           ) : null}
//         </div>
//         <div>
//           <input
//             name="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.confirmPassword}
//             className="w-full p-2 border rounded"
//           />
//           {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//             <div className="text-red-500 text-sm">
//               {formik.errors.confirmPassword}
//             </div>
//           ) : null}
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-700"
//           disabled={formik.isSubmitting}
//         >
//           Signup
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-500">
//           Login
//         </Link>
//       </p>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handleGoogleSignup}
//           className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
//         >
//           Signup with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../src/Instance/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const SignupPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
        console.log(values,'value');
      axiosInstance
        .post("/signup", values)
        .then((response) => {
          console.log("Signup successful:", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.error("There was an error signing up!", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const handleGoogleSignupSuccess = (response) => {
    const { credential } = response;
    console.log(credential,'cr');
    axiosInstance
      .post("/google-signup", { idToken: credential })
      .then((response) => {
        console.log("Google Signup successful:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error with Google signup!", error);
      });
  };

  const handleGoogleSignupError = (error) => {
    console.error("Google Signup failed:", error);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-blue-500">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="w-full p-2 border rounded"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.firstName}
            </div>
          ) : null}
        </div>
        <div>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="w-full p-2 border rounded"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          ) : null}
        </div>
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
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="w-full p-2 border rounded"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
          disabled={formik.isSubmitting}
        >
          Signup
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
      <div className="flex justify-center mt-4">
        <GoogleLogin
          onSuccess={handleGoogleSignupSuccess}
          onError={handleGoogleSignupError}
          buttonText="Signup with Google"
          className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 text-sm"
        />
      </div>
    </div>
  );
};

export default SignupPage;
