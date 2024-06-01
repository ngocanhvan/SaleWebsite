import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { Modal, Button } from "react-bootstrap";

const Orders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
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
            "http://localhost:5000/api/user/get-all-orders",
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
            "http://localhost:5000/api/user/get-all-orders",
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
    data.forEach((order) => {
      order.orderItems.forEach((product) => {
        fetchDataOneProduct(product.product);
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

  const [dataBuyer, setDataBuyer] = useState({});
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const fetchDataBuyer = async (id) => {
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
        const res = await axios.get(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        const nameBuyer = res.data.getaUser.lastname;
        setDataBuyer((prevData) => ({
          ...prevData,
          [id]: nameBuyer,
        }));
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const nameBuyer = response.data.getaUser.lastname;
        setDataBuyer((prevData) => ({
          ...prevData,
          [id]: nameBuyer,
        }));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    data.forEach((order) => {
      fetchDataBuyer(order.user);
    });
  }, [data]);

  const handleShowModalCustomer = async (buyerId) => {
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
          `http://localhost:5000/api/user/${buyerId}`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        const buyer = res.data.getaUser;
        setSelectedBuyer(buyer);
        setShowModalCustomer(true);
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const res = await axios.get(
          `http://localhost:5000/api/user/${buyerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const buyer = res.data.getaUser;
        setSelectedBuyer(buyer);
        setShowModalCustomer(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleCloseModalCustomer = () => {
    setSelectedBuyer(null);
    setShowModalCustomer(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Customer</th>
              <th scope="col">ShippingInfo</th>
              <th scope="col">OrderItems</th>
              <th scope="col">Paid At</th>
              <th scope="col">TotalPrice</th>
              <th scope="col">OrderStatus</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>
                  <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => handleShowModalCustomer(value.user)}
                  >
                    {dataBuyer[value.user]}
                  </button>
                </td>
                <td className="whitespace-pre">
                  {value.shippingInfo.firstName} {value.shippingInfo.lastName}
                </td>
                <td>
                  {value.orderItems.map((item, index) => (
                    <div key={index}>
                      <p>
                        Product:
                        <button
                          className="btn btn-link text-decoration-none"
                          onClick={() => handleShowModalProduct(item.product)}
                        >
                          {dataOneProduct[item.product]}
                        </button>
                      </p>
                    </div>
                  ))}
                </td>
                <td>{value.paidAt}</td>
                <td>{value.totalPrice}</td>
                <td>{value.orderStatus}</td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModalCustomer} onHide={handleCloseModalCustomer}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className="whitespace-pre">
              Name: {selectedBuyer?.firstname} {selectedBuyer?.lastname}
            </p>
            <p>Email: {selectedBuyer?.email}</p>
            <p>Mobile: {selectedBuyer?.mobile}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalCustomer}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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

export default Orders;
