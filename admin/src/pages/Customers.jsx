import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { Modal, Button } from "react-bootstrap";

const Customers = () => {
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
        const res = await axios.get(
          "http://localhost:5000/api/user/all-users",
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
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

  const [dataOneProduct, setDataOneProduct] = useState({});
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const fetchDataOneProduct = async (id) => {
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
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        const productTitle = res.data?.title;
        setDataOneProduct((prevData) => ({
          ...prevData,
          [id]: productTitle,
        }));
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`
        );
        const productTitle = response.data?.title;
        setDataOneProduct((prevData) => ({
          ...prevData,
          [id]: productTitle,
        }));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    // Gọi fetchDataOneProduct cho từng sản phẩm trong data
    data.forEach((product) => {
      product.wishlist.forEach((product) => {
        fetchDataOneProduct(product);
      });
    });
  }, [data]);
  const handleShowModalProduct = async (productId) => {
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
          `http://localhost:5000/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        const product = res.data;
        setSelectedProduct(product);
        setShowModalProduct(true);
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const res = await axios.get(
          `http://localhost:5000/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const product = res.data;
        setSelectedProduct(product);
        setShowModalProduct(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleCloseModalProduct = () => {
    setSelectedProduct(null);
    setShowModalProduct(false);
  };

  const onDeleteUser = async (id, e) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
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
          await axios.delete(`http://localhost:5000/api/user/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          fetchData();
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          await axios.delete(`http://localhost:5000/api/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchData();
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
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
              <th scope="col">WishList</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
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
                <td>
                  {value.wishlist.map((item, index) => (
                    <div key={index}>
                      <p>
                        Product:
                        <button
                          className="btn btn-link text-decoration-none"
                          onClick={() => handleShowModalProduct(item)}
                        >
                          {dataOneProduct[item]}
                        </button>
                      </p>
                    </div>
                  ))}
                </td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
                <td>
                  <button
                    className="btn btn-success mx-2"
                    onClick={(e) => onDeleteUser(value._id, e)}
                  >
                    <MdDeleteForever className="mb-1 mr-2 fs-5" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModalProduct} onHide={handleCloseModalProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Product Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Title: {selectedProduct?.title}</p>
            <p>Slug: {selectedProduct?.slug}</p>
            <p>Description: {selectedProduct?.description}</p>
            <p>Price: {selectedProduct?.price}</p>
            <p>Category: {selectedProduct?.category}</p>
            <p>Brand: {selectedProduct?.brand}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalProduct}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customers;
