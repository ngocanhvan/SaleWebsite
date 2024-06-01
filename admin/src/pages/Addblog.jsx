import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Addblog = () => {
  const [mes, setMes] = useState("");
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
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
          const res = await axios.get(
            "http://localhost:5000/api/blogcategory/",
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          setCategories(res.data);
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          const response = await axios.get(
            "http://localhost:5000/api/blogcategory/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

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
          category: data.category,
          description: data.description,
        };
        await axios.post("http://localhost:5000/api/blog/", formData, config);
        setMes("Blog created successfully!");
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const formData = {
          title: data.title,
          category: data.category,
          description: data.description,
        };
        await axios.post("http://localhost:5000/api/blog/", formData, config);
        setMes("Blog created successfully!");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You are not admin. Please login again.");
        window.location.href = "/";
      } else {
        console.error(error);
        setMes("Error creating blog. Please try again.");
      }
    }
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      {mes && <div className="alert alert-success">{mes}</div>}
      <div>
        <form action="">
          <div className="mt-4 mb-3">
            <input
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              id="title"
              value={data.title}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <select
            name="category"
            className="form-control py-3 mb-3"
            id="category"
            value={data.category}
            onChange={(e) => handle(e)}
          >
            <option value="">Select Blog Category</option>
            {categories.map((category) => (
              <option key={category._id}>{category.title}</option>
            ))}
          </select>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Enter Blog Description"
              id="description"
              value={data.description}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
