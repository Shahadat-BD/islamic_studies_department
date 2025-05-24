import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, image } = formData;

    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;

      const saveUser = {
        name,
        email,
        image,
        role: "student"
      };

      await fetch("${import.meta.env.VITE_API_URL}/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser)
      });

      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error", err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Password"
            className="w-full px-4 py-2 border rounded pr-10"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[13px] text-lg"
          >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </button>
        </div>

        <input
          type="text"
          name="image"
          placeholder="Profile Image URL"
          className="w-full px-4 py-2 border rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded w-full"
        >
          Register
        </button>

        <p className="text-center text-sm mt-2">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Please login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
