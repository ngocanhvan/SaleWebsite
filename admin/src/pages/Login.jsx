import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/user/admin-login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data?.token)
      );
      // Tạo chuỗi cookie
      const cookieValue = `refreshToken=${response.data?.refreshToken}; path=/;`;
      // Lưu cookie
      document.cookie = cookieValue;

      if (response.data?.token) {
        if (response.data?.role === "admin") {
          navigate("/admin");
        } else {
          alert(response.data.data);
        }
      } else {
        alert(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-5" style={{ background: "#E9CAFA", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <div className="mb-3 mt-1 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <div className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5">
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              type="submit"
              style={{ background: "#8563FA" }}
              onClick={(e) => submit(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
