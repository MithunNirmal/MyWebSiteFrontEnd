import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";


const CartPage = () => {
//  const location = useLocation();
//  const cart = location.state?.cart || [];
  const {cart, removeFromCart} = useContext(CartContext);
  const {isLoggedOn, user} = useContext(UserContext);
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

  const handleCheckOut = () => {
    if(!isLoggedOn) {
      alert("please login to proceed to checkout");
      return;
    }
    console.log("Need to handle payment");
  }

  const handleCloseError = () => {
    setInvalidCoupon(false);
  };

  const handleRemoveFromCart = (item) => {
      console.log("handelr " + item);
      removeFromCart(item);
  }

  const getCountOfItem = (item) => {
    let cartItem = cart.find((cartItem) => { if(item.productId === cartItem.productId) {return cartItem}})
    if(cartItem.count)
      return cartItem.count
    else
      return 1;
  }

  const height = (window.innerWidth < 768)? 200 : 450 + "px";

  // const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * getCountOfItem(item)), 0);

  return (
    <div className="content-wrapper" style={{ backgroundColor: "#f8f9fa" }}>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">Shopping Cart</h2>
        <div className="row ">
          <div className="col-md-8 border p-3" style={{ padding:"10px"}}>
            {cart.length != 0 ? cart.map((item) => (
            
              <div
                key={item.id}
                className="row mb-3 align-items-center border-bottom pb-2"
                style={{maxWidth:"100%"}}
              >
                <div className="col-2" style={{maxHeight:"70px", maxWidth:"70px"}}>
                  <img
                    src={item.imageLink || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <p className="mb-0 font-weight-bold text-dark">{item.name}</p>
                </div>
                <div className="col-2">
                  <p className="mb-0 text-secondary" >
                  ₹{item.count? item.price*item.count : item.price}
                  </p>
                </div>
                <div className="col-2" >
                  <p className="mb-0 font-weight-bold text-dark">{item.count? item.count : 1}</p>
                </div>
                <div className="col-2">
                  <button className="btn btn-link btn-sm text-muted" onClick={() => handleRemoveFromCart(item)}>
                    Remove
                  </button>
                </div>
              </div>
            )) : <p>Bag is empty! Please add something</p> }
          </div>
          <div className="col-md-4">
            <div className="border p-3" style={{padding:"10px"}}>
              <h4 className="mb-3">Order Summary</h4>
              <div className="row mb-3">
                <div className="col">Subtotal:</div>
                <div className="col-auto">₹{totalPrice}</div>
              </div>
              <div className="mb-3">
                <div>
                <div className="row">
                  <div className="col-7" style={{paddingTop:"8px"}}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                </div>
                <div className="col-5" style={{alignItems:"end"}}>
                <button
                  className="btn btn-sm btn-secondary mt-2"
                  onClick={handleApplyCoupon}
                >
                  Apply Coupon
                </button>
                </div>
                </div>
                </div>
              </div>
              {invalidCoupon && (
                <div
                  className="alert alert-sm alert-danger alert-dismissible fade show"
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
                <div className="col-auto">₹{totalPrice}</div>
              </div>
              <button className="btn btn-primary btn-block" onClick={handleCheckOut}>
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
