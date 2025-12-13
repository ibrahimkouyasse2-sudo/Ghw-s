import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ ADMIN USES SAME LOGIN ENDPOINT AS USER
      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password }
      );

      if (response.data.success) {
        // 🔐 Ensure only admin can log in
        if (response.data.role !== "admin") {
          toast.error("Access denied: not an admin");
          return;
        }

        setToken(response.data.token);
        toast.success("Admin logged in successfully");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Server error during login"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              placeholder="admin@example.com"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Password
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
