import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";
import { getUserCart } from "../features/user/userSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getWishlistFromDb();
  }, []);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };
  const WishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {WishlistState && WishlistState.lenhth === 0 && (
            <div className="text-center fs-3">No Data</div>
          )}
          {WishlistState &&
            WishlistState?.map((item, index) => {
              return (
                <div
                  className="col-3 bg-white py-3 shadow rounded mx-2"
                  key={index}
                >
                  <div className="wishlist-card position-relative">
                    <img
                      onClick={() => {
                        removeFromWishlist(item?._id);
                      }}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid top-0 end-0"
                      width={20}
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={
                          item?.images[0]?.url
                            ? item?.images[0]?.url
                            : "images/watch.jpg"
                        }
                        className="img-fluid d-block mx-auto"
                        alt="watch"
                        width={100}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">{item?.title}</h5>
                      <h6 className="price">{item?.price}$</h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;