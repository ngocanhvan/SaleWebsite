import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Blogcatlist = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
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
        const res = await axios.get(
          "http://localhost:5000/api/blogcategory/",
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
          "http://localhost:5000/api/blogcategory/",
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
  const onDeleteBlogCategory = async (id, e) => {
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
          await axios.delete(`http://localhost:5000/api/blogcategory/${id}`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });
          fetchData();
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          await axios.delete(`http://localhost:5000/api/blogcategory/${id}`, {
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
  const handleShowModal = (id, title) => {
    setUpdateData({
      id,
      title,
    });
    setShowModal(true);
  };
  const handleUpdateBlogCategory = async (e) => {
    const { id, title } = updateData;
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
          `http://localhost:5000/api/blogcategory/${id}`,
          {
            title,
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
          `http://localhost:5000/api/blogcategory/${id}`,
          {
            title,
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
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td> {value.title} </td>
                <td> {value.createdAt} </td>
                <td> {value.updatedAt} </td>
                <td>
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => handleShowModal(value._id, value.title)}
                  >
                    <AiOutlineEdit className="mb-1 mr-2 fs-5" />
                    Update
                  </button>
                  <button
                    className="btn btn-success mx-2"
                    onClick={(e) => onDeleteBlogCategory(value._id, e)}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
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
              handleUpdateBlogCategory(updateData.id, updateData.title, e)
            }
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blogcatlist;
