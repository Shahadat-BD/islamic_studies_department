
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
// import { toast, Toaster } from "react-hot-toast";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa6";

// const Login = () => {
//   const { login, user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // password toggle

//   useEffect(() => {
//     if (user) {
//       navigate("/dashboard");
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       const res = await login(email, password);
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-96 space-y-4"
//       >
//         <h2 className="text-2xl font-semibold text-center">Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           className="w-full px-4 py-2 border rounded"
//         />

//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             required
//             className="w-full px-4 py-2 border rounded pr-10"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-2 top-[13px] text-lg"
//           >
//             {showPassword ? <FaEyeSlash/> : <FaEye/> }
//           </button>
//         </div>

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           type="submit"
//           className="bg-blue-900 text-white px-4 py-2 rounded w-full"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm mt-2">
//           Not registered yet?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Create an account
//           </Link>
//         </p>
//       </form>
//       <Toaster position="top-right"/>
//     </div>
//   );
// };

// export default Login;


import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[13px] text-lg"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

        <p className="text-center text-sm mt-2">
          Not registered yet?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>

        {/* Debug only (optional): */}
        {/* <p className="text-xs text-gray-500 text-center">From: {from}</p> */}
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;


