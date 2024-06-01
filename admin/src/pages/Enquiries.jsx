import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Enquiries = () => {
  const [data, setData] = useState([]);
const fetchData = async () => {
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
      const res = await axios.get("http://localhost:5000/api/user/all-users", {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
      setData(res.data);
    } else {
      // Token còn hiệu lực, tiếp tục sử dụng
      const response = await axios.get(
        "http://localhost:5000/api/user/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    }
  } catch (error) {
    throw new Error(error);
  }
};
useEffect(() => {
  fetchData();
}, []);

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">isBlocked</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.firstname}</td>
                <td>{value.lastname}</td>
                <td>{value.email}</td>
                <td>{value.mobile}</td>
                <td>{value.address}</td>
                <td>{value.role}</td>
                <td>{value.isBlocked}</td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiries;
