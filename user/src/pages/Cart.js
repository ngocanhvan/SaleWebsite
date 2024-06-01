import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import {
  getUserCart,
  deleteCartProduct,
  updateCartProduct,
} from "../features/user/userSlice";
import { useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  // const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [productUpdateDetail, setProductUpdateDetail] = useState({});

  const [totalAmount, setTotalAmount] = useState(null);
  const [quantityErrors, setQuantityErrors] = useState([]);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  // useEffect(() => {
  //   if (productUpdateDetail !== null) {
  //     dispatch(
  //       updateCartProduct({
  //         cartItemId: productUpdateDetail?.cartItemId,
  //         quantity: productUpdateDetail?.quantity,
  //       })
  //     );
  //     setTimeout(() => {
  //       dispatch(getUserCart());
  //     }, 200);
  //   }
  // }, [productUpdateDetail]);

  useEffect(() => {
    Object.keys(productUpdateDetail).forEach((cartItemId) => {
      const detail = productUpdateDetail[cartItemId];
      dispatch(
        updateCartProduct({
          cartItemId: detail.cartItemId,
          quantity: detail.quantity,
        })
      );
    });

    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity * userCartState[index].price);
      setTotalAmount(sum);
    }
  }, [userCartState]);

  const handleQuantityChange = (e, item) => {
    const updatedQuantity = e.target.value;
    const remainingQuantity = item?.productId?.quantity;

    if (updatedQuantity > remainingQuantity) {
      setQuantityError(
        item._id,
        `Exceeds available quantity (${remainingQuantity})`
      );
    } else {
      setQuantityError(item._id, ""); // Clear the error for the specific item
      const updatedProduct = {
        cartItemId: item._id,
        quantity: updatedQuantity,
      };
      setProductUpdateDetail((prevState) => ({
        ...prevState,
        [item._id]: updatedProduct,
      }));
    }
  };

  const setQuantityError = (itemId, error) => {
    setQuantityErrors((prevState) => ({
      ...prevState,
      [itemId]: error,
    }));
  };

  const getQuantityError = (itemId) => {
    return quantityErrors[itemId] || "";
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                const quantityError = getQuantityError(item._id);
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.productId?.images[0]?.url}
                          className="img-fluid"
                          alt="product"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId?.title}</p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">$ {item?.price}</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          id=""
                          value={
                            productUpdateDetail?.quantity
                              ? productUpdateDetail?.quantity
                              : item?.quantity
                          }
                          // onChange={(e) => {
                          //   setProductUpdateDetail({
                          //     cartItemId: item?._id,
                          //     quantity: e.target.value,
                          //   });
                          // }}
                          onChange={(e) => handleQuantityChange(e, item)}
                        />
                        {quantityError && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              margin: 0,
                            }}
                          >
                            {quantityError}
                          </p>
                        )}
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger "
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        $ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
