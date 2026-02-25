import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-2">Create Account</h2>
      <p className="text-gray-500 mb-6">
        Join SwiftPay for seamless cross-border payments.
      </p>

      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">
            Must be at least 8 characters.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Create Account
        </button>
      </form>

      <p className="text-sm text-center mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
