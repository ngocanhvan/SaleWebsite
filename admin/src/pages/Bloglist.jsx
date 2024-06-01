import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit, AiOutlineCloudUpload } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Bloglist = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
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
        const res = await axios.get("http://localhost:5000/api/blog/", {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        setData(res.data);
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const response = await axios.get("http://localhost:5000/api/blog/", {
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
  const onDeleteBlog = async (id, e) => {
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
          await axios.delete(`http://localhost:5000/api/blog/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          fetchData();
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          await axios.delete(`http://localhost:5000/api/blog/${id}`, {
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

  const handleShowModal = (id, title, category, description) => {
    setUpdateData({
      id,
      title,
      category,
      description,
    });
    setShowModal(true);
  };
  const handleUpdateBlog = async (e) => {
    const { id, title, category, description } = updateData;
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
          `http://localhost:5000/api/blog/${id}`,
          {
            title,
            category,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        handleCloseModal();
        fetchData();
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        await axios.put(
          `http://localhost:5000/api/blog/${id}`,
          {
            title,
            category,
            description,
          },
          {
            headers: {
              "Content-Type": "application/json",
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
          `http://localhost:5000/api/blog/upload/${id}`,
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
          `http://localhost:5000/api/blog/upload/${id}`,
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
      <h3 className="mb-4 title">Blogs List</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">numViews</th>
              <th scope="col">Likes</th>
              <th scope="col">Dislikes</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td> {index + 1} </td>
                <td> {value.title} </td>
                <td> {value.category} </td>
                <td> {value.description} </td>
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
                <td> {value.numViews} </td>
                <td>
                  {value.likes.map((like, index) => (
                    <div key={index}> {like} </div>
                  ))}
                </td>
                <td>
                  {value.dislikes.map((dislike, index) => (
                    <div key={index}> {dislike} </div>
                  ))}
                </td>
                <td> {value.createdAt} </td>
                <td> {value.updatedAt} </td>
                <td>
                  <button
                    className="btn btn-success my-2"
                    onClick={() =>
                      handleShowModal(
                        value._id,
                        value.title,
                        value.category,
                        value.description
                      )
                    }
                  >
                    <AiOutlineEdit className="mb-1 mr-2 fs-5" />
                    Update
                  </button>
                  <button
                    className="btn btn-success my-2"
                    onClick={(e) => onDeleteBlog(value._id, e)}
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
          <Modal.Title>Edit Blog</Modal.Title>
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
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control mb-4"
                id="description"
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData({ ...updateData, description: e.target.value })
                }
              />
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
              handleUpdateBlog(
                updateData.id,
                updateData.title,
                updateData.category,
                updateData.description,
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

export default Bloglist;
