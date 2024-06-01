import React, { useState } from "react";
import axios from "axios";

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("TokenResetPassword"));
      await axios.put(
        `http://localhost:5000/api/user/reset-password/${token}`,
        {
          password: password,
          repassword: repassword,
        }
      );
      var _password = document.getElementById("pass").value;
      var _repassword = document.getElementById("repass").value;

      if (_password === _repassword) {
        alert("Reset Password Successfully!");
      } else {
        alert("Password and confirm password must be the same!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-5" style={{ background: "#E9CAFA", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <input
            type="password"
            name="repassword"
            placeholder="Comfirm Password"
            id="repass"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
            style={{ background: "#8563FA" }}
            type="submit"
            onClick={(e) => submit(e)}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
