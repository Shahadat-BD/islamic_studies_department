// pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, image } = formData;

    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;

      // MongoDB Save
      const saveUser = {
        name,
        email,
        image,
        role: "student" // default
      };

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUser)
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Password"
            className="w-full border p-2 pr-10"
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {showPassword ? "👁️" : "🙈"}
          </span>
        </div>
        <input
          type="text"
          name="image"
          placeholder="Profile Image URL"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
