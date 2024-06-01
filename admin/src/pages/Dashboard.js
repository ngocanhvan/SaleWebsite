import React, { useEffect, useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiShoppingBag } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { Column } from "@ant-design/plots";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 54,
    },
    {
      type: "July",
      sales: 45,
    },
    {
      type: "Aug",
      sales: 85,
    },
    {
      type: "Sep",
      sales: 62,
    },
    {
      type: "Oct",
      sales: 142,
    },
    {
      type: "Nov",
      sales: 136,
    },
    {
      type: "Dec",
      sales: 178,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const [countProduct, setCountProduct] = useState(0);
  const fetchProducts = async () => {
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
        const res = await axios.get("http://localhost:5000/api/product/", {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        const totalProducts = res.data.length;
        setCountProduct(totalProducts);
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const response = await axios.get("http://localhost:5000/api/product/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const totalProducts = response.data.length;
        setCountProduct(totalProducts);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const [countOrder, setCountOrder] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const fetchOrders = async () => {
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
          "http://localhost:5000/api/user/get-all-orders",
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        const totalOrders = res.data.length;
        setCountOrder(totalOrders);
        response.data.forEach((order) => {
          setTotalPrice(order.totalPrice);
        });
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const response = await axios.get(
          "http://localhost:5000/api/user/get-all-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const totalOrders = response.data.length;
        setCountOrder(totalOrders);
        console.log(response.data);
        let sumPrice = 0;
        response.data.forEach((order) => {
          sumPrice += order.totalPrice;
        });
        setTotalPrice(sumPrice);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const [countUser, setCountUser] = useState(0);
  const fetchUsers = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token"));
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Chuyển đổi thời gian hiện tại sang đơn vị giây

      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn, xử lý tương ứng (ví dụ: đăng nhập lại)
        Cookies.get("refreshToken");
        const res = await axios.get("http://localhost:5000/api/user/refresh", {
          withCredentials: true, // Gửi các cookie cùng với yêu cầu
        });
        const newToken = res.data.accessToken;

        localStorage.setItem("access_token", JSON.stringify(newToken));
        // Tiếp tục sử dụng token mới
        const response = await axios.get(
          "http://localhost:5000/api/user/all-users",
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        const totalUsers = response.data.length;
        setCountUser(totalUsers);
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
        const totalUsers = response.data.length;
        setCountUser(totalUsers);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <RiMoneyDollarCircleLine className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{totalPrice} $</h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-3 mt-3">
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <FiUsers className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Users</p>
            <h4 className="mb-0 sub-title">{countUser}</h4>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <HiShoppingBag className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Orders</p>
            <h4 className="mb-0 sub-title">{countOrder}</h4>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white p-3 roudned-3 gap-3">
          <div>
            <TiShoppingCart className="fs-1 mb-3" />
          </div>
          <div>
            <p className="desc">Total Products</p>
            <h4 className="mb-0 sub-title">{countProduct}</h4>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="my-4">
        <h3 className="mb-5 title">Recent Reviews</h3>
      </div>
    </div>
  );
};

export default Dashboard;
