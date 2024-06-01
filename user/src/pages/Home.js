import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import SpecialProducts from "../components/SpecialProducts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../features/products/productSlice";
import { getAllBlogs } from "../features/blogs/blogSlice";
import ReactStars from "react-rating-stars-component";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import BlogCard from "../components/BlogCard";
import view from "../images/view.svg";
import { addToWishList } from "../features/products/productSlice";
import moment from "moment";
import { getUserCart } from "../features/user/userSlice";

const Home = () => {
  const productState = useSelector((state) => state?.product?.products);
  const blogState = useSelector((state) => state?.blog?.blog);
  const natigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    getallProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getallProducts = () => {
    dispatch(getAllProduct());
  };

  const addToWish = (id) => {
    dispatch(addToWishList(id));
  };
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative ">
                <img
                  src="images/banner02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>Title for products</h4>
                  <h5>Product's name</h5>
                  <p>Original price/Promotional price</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-05.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Title for products</h4>
                    <h5>Product's name</h5>
                    <p>
                      Original price <br />
                      Promotional price
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Title for products</h4>
                    <h5>Product's name</h5>
                    <p>
                      Original price <br />
                      Promotional price
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Title for products</h4>
                    <h5>Product's name</h5>
                    <p>
                      Original price <br />
                      Promotional price
                    </p>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Title for products</h4>
                    <h5>Product's name</h5>
                    <p>
                      Original price <br />
                      Promotional price
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over $100</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Superise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Get factory default price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% protected payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Computers</h6>
                    <p>15 Items</p>
                  </div>
                  <img src="images/cart110.png" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Speakers</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/cart1101.png" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Tablets</h6>
                    <p>15 Items</p>
                  </div>
                  <img src="images/cart1102.png" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Airpods</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/cart1103.png" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Iphones</h6>
                    <p>15 Items</p>
                  </div>
                  <img src="images/cart1105.png" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Headphones</h6>
                    <p>15 Items</p>
                  </div>
                  <img src="images/cart1106.png" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/cart1104.png" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading"> Featured Collection</h3>
            </div>
            <div className="row">
              <div className="row">
                {productState &&
                  productState?.map((item, index) => {
                    if (item.tags === "featured") {
                      return (
                        <div key={index} className="col-3">
                          <div className="product-card position-relative">
                            <div className="wishlist-icon position-absolute">
                              <button
                                className="border-0 bg-transparent"
                                onClick={(e) => {
                                  addToWish(item?._id);
                                }}
                              >
                                <img src={wish} alt="wishlist" />
                              </button>
                            </div>
                            <div className="product-image">
                              <img
                                src={item?.images[0].url}
                                className="img-fluid mx-auto"
                                alt="product"
                                width={160}
                              />
                              <img
                                src={item?.images[1].url}
                                className="img-fluid mx-auto"
                                alt="product"
                                width={160}
                              />
                            </div>
                            <div className="product-details">
                              <h6 className="brand">{item?.brand}</h6>
                              <h5 className="product-title">{item?.title}</h5>
                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.totalrating}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p className="price">{item?.price}$</p>
                            </div>
                            <div className="action-bar position-absolute">
                              <div className="d-flex flex-column gap-15">
                                <button className="border-0 bg-transparent">
                                  <img src={prodcompare} alt="compare" />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img
                                    onClick={() =>
                                      natigate("/product/" + item?._id)
                                    }
                                    src={view}
                                    alt="view"
                                  />
                                </button>
                                <button className="border-0 bg-transparent">
                                  <img src={addcart} alt="addcart" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="famous-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="col-12">
            <h3 className="section-heading">Latest product</h3>
          </div>
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative bg-ededed">
                <img
                  src="images/famous-1.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo. for 24 mo*</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-2.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Studio Display</h5>
                  <h6 className="text-dark">S600 nits or brightness</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-3.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Smart Phones</h5>
                  <h6 className="text-dark">Smart Phone 13 Pro</h6>
                  <p className="text-dark">
                    Now in Green. From $999 or $41.62/mo. for 24 mo
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="images/famous-4.webp"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Home Speaker</h5>
                  <h6 className="text-dark">Room-filing sound</h6>
                  <p className="text-dark">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading"> Special Products</h3>
            </div>
          </div>
          <div className="row">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "special") {
                  return (
                    <SpecialProducts
                      key={index}
                      id={item?._id}
                      title={item?.item}
                      brand={item?.brand}
                      totalrating={item?.totalrating.toString()}
                      price={item?.price}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      image={item?.images[0].url}
                    />
                  );
                }
              })}
          </div>
        </div>
      </section>
      <section
        className="popular-wrapper home-wrapper-2 py-5"
      >
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Popular Products</h3>
            </div>
            <div className="row">
              {productState &&
                productState?.map((item, index) => {
                  if (item.tags === "popular") {
                    return (
                      <div key={index} className="col-3">
                        <div className="product-card position-relative">
                          <div className="wishlist-icon position-absolute">
                            <button
                              className="border-0 bg-transparent"
                              onClick={(e) => {
                                addToWish(item?._id);
                              }}
                            >
                              <img src={wish} alt="wishlist" />
                            </button>
                          </div>
                          <div className="product-image">
                            <img
                              src={item?.images[0].url}
                              className="img-fluid mx-auto"
                              alt="product"
                              width={160}
                            />
                            <img
                              src={item?.images[1].url}
                              className="img-fluid mx-auto"
                              alt="product"
                              width={160}
                            />
                          </div>
                          <div className="product-details">
                            <h6 className="brand">{item?.brand}</h6>
                            <h5 className="product-title">{item?.title}</h5>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.totalrating}
                              edit={false}
                              activeColor="#ffd700"
                            />
                            <p className="price">{item?.price}$</p>
                          </div>
                          <div className="action-bar position-absolute">
                            <div className="d-flex flex-column gap-15">
                              <button className="border-0 bg-transparent">
                                <img src={prodcompare} alt="compare" />
                              </button>
                              <button className="border-0 bg-transparent">
                                <img
                                  onClick={() =>
                                    natigate("/product/" + item?._id)
                                  }
                                  src={view}
                                  alt="view"
                                />
                              </button>
                              <button className="border-0 bg-transparent">
                                <img src={addcart} alt="addcart" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="marquee-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Blog Card</h3>
            </div>
            {(blogState || [])?.map((item, index) => {
              if (index < 5) {
                return (
                  <div className="col-3 " key={index}>
                    <BlogCard
                      id={item?._id}
                      title={item?.title}
                      description={item?.description}
                      image={item?.images[0]?.url}
                      date={moment(item?.createdAt).format(
                        "MMMM Do YYYY, h:mm a"
                      )}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
