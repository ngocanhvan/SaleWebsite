import React, {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import {Modal, Button} from "react-bootstrap";
import moment from "moment";
import {AutoComplete, Divider, InputNumber} from "antd";
import "../styles/orders.css";
import {RiDeleteBin6Line} from "react-icons/ri";
import {toast} from "react-toastify";
import {MdDeleteForever} from "react-icons/md";

const Orders = () => {
  const [data, setData] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
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
          "http://localhost:5000/api/orderAdmin/get-all-orders",
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
          "http://localhost:5000/api/orderAdmin/get-all-orders",
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
  const fetchAllProduct = async () => {
    try {
      const {data} = await axios.get("http://localhost:5000/api/product/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllProduct(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchAllProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [showModalAddOrder, setShowModalAddOrder] = useState(false);
  const [dataOrder, setDataOrder] = useState({
    customerName: "",
  });
  const handleShowModalAddOrder = () => {
    setShowModalAddOrder(true);
  };
  const handleCloseModalAddOrder = () => {
    setShowModalAddOrder(false);
    setDataOrder({});
    setProductApply([]);
    setTotalPrice(0);
    setErrorMsg({
      customerName: "",
      orderItems: "",
    });
  };
  const token = JSON.parse(localStorage.getItem("access_token"));
  const [errorMsg, setErrorMsg] = useState({
    orderItems: "",
  });
  const handleAddOrder = async () => {
    if (!productApply.length) {
      setErrorMsg((prev) => ({
        ...prev,
        orderItems: "Please select product to create order.",
      }));
      return;
    }
    const hasError = Object.values(errorMsg).some((item) => item !== "");
    if (!hasError) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const orderItems = productApply.map((product) => ({
          product: product.id,
          price: product.price,
          quantity: product.quantity,
        }));
        const formData = {
          customerName: dataOrder.customerName || "Khách lẻ",
          orderItems: orderItems,
          totalPrices: totalPrice,
        };
        const {data} = await axios.post(
          "http://localhost:5000/api/orderAdmin/create-order",
          formData,
          config
        );
        if (data.status === true) {
          toast.success(data.msg);
          setShowModalAddOrder(false);
          setDataOrder({});
          setProductApply([]);
          setTotalPrice(0);
          fetchData();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatDateTime = (time) => {
    const dateTimeString = time.toString();
    const dateTime = moment(dateTimeString);

    const formattedDate = dateTime.format("DD/MM/YYYY");
    const formattedTime = dateTime.format("HH:mm:ss");
    return `${formattedTime} ${formattedDate}`;
  };

  const options = allProduct.map((product) => ({
    value: product.title,
    id: product._id,
  }));
  const [productApply, setProductApply] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getInformationProduct = async (productId) => {
    try {
      const {data} = await axios.get(
        `http://localhost:5000/api/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalPrice(totalPrice + data.price * 1);
      const profileProduct = {
        id: data._id,
        title: data.title,
        price: data.price,
        inventory_quantity: data.quantity,
        quantity: 1,
      };
      setProductApply((prev) => [...prev, profileProduct]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectProduct = (inputValue, option) => {
    if (inputValue) {
      setErrorMsg((prev) => ({
        ...prev,
        orderItems: "",
      }));
    }
    const checkExists = productApply.some(
      (item) => item.id.toString() === option.id.toString()
    );
    if (!checkExists) {
      getInformationProduct(option.id);
    }
  };

  const onChangeQuantity = (id, value) => {
    const updateQuantity = productApply.map((product) => {
      if (product.id === id) {
        return {...product, quantity: value};
      }
      return product;
    });
    setProductApply(updateQuantity);
    const total = updateQuantity.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProduct = productApply.filter(
      (product) => product.id !== productId
    );
    setProductApply(updatedProduct);
    const total = updatedProduct.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const onDeleteOrder = async (id, e) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?")) {
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
          const {data} = await axios.delete(
            `http://localhost:5000/api/orderAdmin/${id}`,
            {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          if (data.status === true) {
            toast.success(data.msg);
          }
          fetchData();
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          const {data} = await axios.delete(
            `http://localhost:5000/api/orderAdmin/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (data.status === true) {
            toast.success(data.msg);
          }
          fetchData();
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <div>
      <div className="title_head">
        <div className="title_text">List Orders</div>
        <button className="button" onClick={() => handleShowModalAddOrder()}>
          Add Order
        </button>
      </div>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Customer</th>
              <th scope="col">OrderItems</th>
              <th scope="col">TotalPrice</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => {
              return (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{value.customerName}</td>
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
                          </button>{" "}
                          ({item.quantity})
                        </p>
                      </div>
                    ))}
                  </td>
                  <td>{value.totalPrice} vnd</td>
                  <td>{formatDateTime(value.createdAt)}</td>
                  <td>{formatDateTime(value.updatedAt)}</td>
                  <td>
                    <button
                      className="btn btn-success my-2"
                      onClick={(e) => onDeleteOrder(value._id, e)}
                    >
                      <MdDeleteForever className="mb-1 mr-2 fs-5" />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
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
            <p>Price: {selectedProduct?.price} vnd</p>
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

      <Modal
        show={showModalAddOrder}
        onHide={handleCloseModalAddOrder}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Customer name:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={dataOrder.customerName}
                onChange={(e) => {
                  setDataOrder((prev) => ({
                    ...prev,
                    customerName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                TotalPrice:
              </label>
              <p style={{textAlign: "center", color: "red"}}>
                {totalPrice} vnd
              </p>
            </div>
            <div className="mb-3 d-flex flex-column align-items-start">
              <label htmlFor="title" className="form-label">
                Select product:
              </label>
              <AutoComplete
                options={options}
                placeholder="Search"
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={handleSelectProduct}
              />
              {errorMsg.orderItems && (
                <div className="error_msg">{errorMsg.orderItems}</div>
              )}
            </div>
            <div className="display_product">
              {productApply.map((product, index) => {
                return (
                  <div key={index}>
                    <div className="product_container">
                      <div className="product_name">{product.title}</div>
                      <div className="product_qty">
                        <InputNumber
                          min={1}
                          max={product.inventory_quantity}
                          onChange={(value) =>
                            onChangeQuantity(product.id, value)
                          }
                          className=""
                          value={product?.quantity || 1}
                        />
                      </div>
                      <div className="product_price">{product.price} vnd</div>
                      <div className="deleteBtn">
                        <RiDeleteBin6Line
                          onClick={() => handleDeleteProduct(product.id)}
                          style={{cursor: "pointer"}}
                        />
                      </div>
                    </div>
                    <Divider />
                  </div>
                );
              })}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleCloseModalAddOrder}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => handleAddOrder()}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
