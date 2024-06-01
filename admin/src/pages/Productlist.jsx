import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit, AiOutlineCloudUpload } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Productlist = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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
            "http://localhost:5000/api/prodcategory/",
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
            "http://localhost:5000/api/prodcategory/",
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
  useEffect(() => {
    const fetchBrands = async () => {
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
          const res = await axios.get("http://localhost:5000/api/brand/", {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          setBrands(res.data);
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          const response = await axios.get("http://localhost:5000/api/brand/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBrands(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  }, []);
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    color: "",
    tags: "",
  });
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
        const res = await axios.get("http://localhost:5000/api/product/", {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        setData(res.data);
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const response = await axios.get("http://localhost:5000/api/product/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onDeleteProduct = async (id, e) => {
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
          await axios.delete(`http://localhost:5000/api/product/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          fetchData();
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          await axios.delete(`http://localhost:5000/api/product/${id}`, {
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
  const handleShowModal = (
    id,
    title,
    description,
    price,
    category,
    brand,
    quantity,
    color,
    tags
  ) => {
    setUpdateData({
      id,
      title,
      description,
      price,
      category,
      brand,
      quantity,
      color,
      tags,
    });
    setShowModal(true);
  };
  const handleUpdateProduct = async (e) => {
    const {
      id,
      title,
      description,
      price,
      category,
      brand,
      quantity,
      color,
      tags,
    } = updateData;
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
        await axios.put(
          `http://localhost:5000/api/product/${id}`,
          {
            title,
            description,
            price,
            category,
            brand,
            quantity,
            color,
            tags,
          },
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        handleCloseModal();
        fetchData();
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        await axios.put(
          `http://localhost:5000/api/product/${id}`,
          {
            title,
            description,
            price,
            category,
            brand,
            quantity,
            color,
            tags,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        handleCloseModal();
        fetchData();
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleCloseModal = () => setShowModal(false);

  const handleUploadImage = async (id, files) => {
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
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
        await axios.put(
          `http://localhost:5000/api/product/upload/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
              "Content-Type": "multipart/form-data", // Đặt header "Content-Type" là "multipart/form-data" để gửi dữ liệu dạng form-data
            },
          }
        );
        fetchData();
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
        await axios.put(
          `http://localhost:5000/api/product/upload/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Đặt header "Content-Type" là "multipart/form-data" để gửi dữ liệu dạng form-data
            },
          }
        );
        fetchData();
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Slug</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Brand</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sold</th>
              <th scope="col">Image</th>
              <th scope="col">Color</th>
              <th scope="col">Tags</th>
              <th scope="col">Ratings</th>
              <th scope="col">Total Rating</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.title}</td>
                <td>{value.slug}</td>
                <td>{value.description}</td>
                <td>{value.price}</td>
                <td>{value.category}</td>
                <td>{value.brand}</td>
                <td>{value.quantity}</td>
                <td>{value.sold}</td>
                <td>
                  {value.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt="Hình ảnh"
                      width="50px"
                      height="50px"
                    />
                  ))}
                </td>
                <td>{value.color}</td>
                <td>{value.tags}</td>
                <td>
                  {value.ratings.map((rating, index) => (
                    <div key={index}>
                      <p>Star: {rating.star}</p>
                      <p>Comment: {rating.comment}</p>
                      <p>Posted by: {rating.postedby}</p>
                    </div>
                  ))}
                </td>
                <td>{value.totalrating}</td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
                <td>
                  <button
                    className="btn btn-success my-2"
                    onClick={() =>
                      handleShowModal(
                        value._id,
                        value.title,
                        value.description,
                        value.price,
                        value.category,
                        value.brand,
                        value.quantity,
                        value.color,
                        value.tags
                      )
                    }
                  >
                    <AiOutlineEdit className="mb-1 mr-2 fs-5" />
                    Update
                  </button>
                  <button
                    className="btn btn-success my-2"
                    onClick={(e) => onDeleteProduct(value._id, e)}
                  >
                    <MdDeleteForever className="mb-1 mr-2 fs-5" />
                    Delete
                  </button>
                  <label className="btn btn-success my-2">
                    <AiOutlineCloudUpload />
                    Upload Image
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleUploadImage(value._id, e.target.files)
                      }
                      multiple
                    />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control mb-4"
                id="title"
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
                }
              />
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control mb-4"
                id="description"
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    description: e.target.value,
                  })
                }
              />
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                name="price"
                className="form-control mb-4"
                id="price"
                value={updateData.price}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    price: e.target.value,
                  })
                }
              />

              <label htmlFor="category" className="form-label">
                Category:
              </label>
              <select
                name="category"
                className="form-control mb-4"
                id="category"
                value={updateData.category}
                onChange={(e) =>
                  setUpdateData({ ...updateData, category: e.target.value })
                }
              >
                <option value="">Select Blog Category</option>
                {categories.map((category) => (
                  <option key={category._id}>{category.title}</option>
                ))}
              </select>

              <label htmlFor="brand" className="form-label">
                Select Brand:
              </label>
              <select
                name="brand"
                className="form-control mb-4"
                id="brand"
                value={updateData.brand}
                onChange={(e) =>
                  setUpdateData({ ...updateData, brand: e.target.value })
                }
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id}>{brand.title}</option>
                ))}
              </select>

              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control mb-4"
                id="quantity"
                value={updateData.quantity}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    quantity: e.target.value,
                  })
                }
              />

              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <select
                name="color"
                className="form-control py-3 mb-3"
                id="color"
                value={updateData.color}
                onChange={(e) =>
                  setUpdateData({ ...updateData, color: e.target.value })
                }
              >
                <option value="">Select Color</option>
                <option value="Xanh">Xanh</option>
                <option value="Đỏ">Đỏ</option>
                <option value="Tím">Tím</option>
                <option value="Vàng">Vàng</option>
                <option value="Lam">Lam</option>
                <option value="Tràm">Tràm</option>
                <option value="Lục">Lục</option>
                <option value="Black">Black</option>
                <option value="Nâu">Nâu</option>
              </select>

              <label htmlFor="tags" className="form-label">
                Tags:
              </label>
              <select
                name="tags"
                className="form-control py-3 mb-3"
                id="tags"
                value={updateData.tags}
                onChange={(e) =>
                  setUpdateData({ ...updateData, tags: e.target.value })
                }
              >
                <option value="">Select Tags</option>
                <option value="featured">featured</option>
                <option value="special">special</option>
                <option value="popular">popular</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={(e) =>
              handleUpdateProduct(
                updateData.id,
                updateData.title,
                updateData.description,
                updateData.price,
                updateData.category,
                updateData.brand,
                updateData.quantity,
                updateData.color,
                updateData.tags,
                e
              )
            }
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productlist;
