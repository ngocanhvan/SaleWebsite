import React, { useState } from "react";
import axios from "axios";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
const Forgotpassword = () => {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/user/forgot-password",
        {
          email: email,
        }
      );
      if (!response.data.msg) {
        localStorage.setItem(
          "TokenResetPassword",
          JSON.stringify(response.data)
        );
        alert(
          "Password reset request has been sent successfully. Please check your email."
        );
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                Please Enter your register email to get reset password mail. We
                will send you an email to reset your password
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-floating mt-3"
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button
                      className="button border-0"
                      type="submit"
                      onClick={(e) => submit(e)}
                    >
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
