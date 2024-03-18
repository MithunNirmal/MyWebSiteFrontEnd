import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CartPage = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  const [coupon, setCoupon] = useState("");
  const [invalidCoupon, setInvalidCoupon] = useState(false);

  const handleApplyCoupon = () => {
    if (coupon === "SAVE10") {
      setInvalidCoupon(false);
      const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
      const discountedPrice = totalPrice * 0.9;
    } else {
      setInvalidCoupon(true);
    }
  };

  const handleCloseError = () => {
    setInvalidCoupon(false);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="content-wrapper" style={{ backgroundColor: "#f8f9fa" }}>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">Shopping Cart</h2>
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="row mb-3 align-items-center border-bottom pb-2"
              >
                <div className="col-2">
                  <img
                    src={item.imageLinks[0] || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-6">
                  <p className="mb-0 font-weight-bold text-dark">{item.name}</p>
                </div>
                <div className="col-2">
                  <p className="mb-0 text-secondary">${item.price}</p>
                </div>
                <div className="col-2">
                  <button className="btn btn-link btn-sm text-muted">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="border p-3">
              <h4 className="mb-3">Order Summary</h4>
              <div className="row mb-3">
                <div className="col">Subtotal:</div>
                <div className="col-auto">${totalPrice}</div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-secondary mt-2"
                  onClick={handleApplyCoupon}
                >
                  Apply Coupon
                </button>
              </div>
              {invalidCoupon && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  Invalid coupon. Please try again.
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseError}
                  ></button>
                </div>
              )}
              <div className="row mb-3">
                <div className="col">Total:</div>
                <div className="col-auto">${totalPrice}</div>
              </div>
              <button className="btn btn-primary btn-block">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
