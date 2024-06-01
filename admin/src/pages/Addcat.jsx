import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Addcat = () => {
  const [data, setData] = useState({
    title: "",
  });
  const [message, setMessage] = useState("");
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const submit = async (e) => {
    try {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("access_token"));
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Chuyển đổi thời gian hiện tại sang đơn vị giây
      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn, xử lý tương ứng (ví dụ: đăng nhập lại)
        Cookies.get("refreshToken");
        const response = await axios.get(
          "http://localhost:5000/api/user/refresh",
          {
            withCredentials: true, // Gửi các cookie cùng với yêu cầu
          }
        );
        const newToken = response.data.accessToken;

        localStorage.setItem("access_token", JSON.stringify(newToken));
        // Tiếp tục sử dụng token mới
        const config = {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        };
        const formData = {
          title: data.title,
        };
        await axios.post(
          "http://localhost:5000/api/prodcategory/",
          formData,
          config
        );
        setMessage("Product Category created successfully!");
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const formData = {
          title: data.title,
        };
        await axios.post(
          "http://localhost:5000/api/prodcategory/",
          formData,
          config
        );
        setMessage("Product Category created successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You are not admin. Please login again.");
        window.location.href = "/";
      } else {
        console.error(error);
        setMessage("Error creating product category. Please try again.");
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          <input
            type="text"
            name="title"
            placeholder="Enter Category"
            id="title"
            value={data.title}
            onChange={(e) => handle(e)}
            className="form-control form-floating mt-3"
            style={{ height: "60px", width: "100%" }}
          />
          <button
            className="btn btn-success border-0 rounded-3 mt-5"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
