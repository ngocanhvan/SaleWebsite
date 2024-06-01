import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { getAnUserOrders } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { getUserCart } from "../features/user/userSlice";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUserOderFromDb();
  }, []);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const getUserOderFromDb = () => {
    dispatch(getAnUserOrders());
  };

  const setDate = (day) => {
    const date = new Date(day);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const orderState = useSelector((state) => state?.auth?.orders);

  return (
    <>
      <Meta title={"Orders"} />
      <BreadCrumb title="Orders" />
      <Container class1="blog-wrapper py-5">
        <div>
          <h3 className="mb-4 title">Orders</h3>
          <div className="container table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Shipping Info</th>
                  <th scope="col">Order Items</th>
                  <th scope="col">Paid At</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orderState &&
                  orderState?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div>
                            <p>First Name: {item.shippingInfo.firstName}</p>
                            <p>Last Name: {item.shippingInfo.lastName}</p>
                            <p>Address: {item.shippingInfo.address}</p>
                            <p>City: {item.shippingInfo.city}</p>
                          </div>
                        </td>
                        <td>
                          {item.orderItems.map((orderItem, index) => {
                            return (
                              <div key={index}>
                                <p>Product: {orderItem.product.title}</p>
                                <img
                                  src={orderItem.product.images[0].url}
                                  width={50}
                                />
                                <p>Quantity: {orderItem.quantity}</p>
                                <p>Price: {orderItem.price}</p>
                              </div>
                            );
                          })}
                        </td>
                        <td>{setDate(item.paidAt)}</td>
                        <td>{item.totalPrice}</td>
                        <td>{item.orderStatus}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
