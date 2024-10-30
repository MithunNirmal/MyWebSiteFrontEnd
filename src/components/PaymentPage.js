import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./PaymentPage.css";
import { UrlContext } from "../contexts/UrlContext";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { Button } from "react-bootstrap";

const PaymentPage = () => {
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const location = useLocation();
  const { amount, payable } = location.state;
  const { server } = useContext(UrlContext);
  const { cart } = useContext(CartContext);
  const { userId } = useContext(UserContext);


  const handlePayment = async () => {
    try {

      setPaymentInProgress(true);
       //Simulate payment processing time
       setTimeout(()=>{}, 4000);

      
      const paymentResponse = await fetch(server+"/api/v1/pay/makePayment", {
                                                      method: "POST",
                                                      headers: {
                                                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                                                      },
                                                    });
        //Simulate payment delay
        setTimeout(()=>{}, 3000);
//      const paymentData = await paymentResponse.json();

      // Check if payment was successful
      if (paymentResponse.status == 200) {

        console.log("Payment success");
        //const orderResponse = await 
        fetch(server+"/api/v1/placeOrder?userId="+ userId + "&amount=" +amount , {
                                              method: "POST",
                                              headers: {
                                                Authorization: "Bearer " + localStorage.getItem("jwt"),
                                                "Content-Type": "application/json",
                                              },
                                              body:JSON.stringify(cart)
        })
        .then((response) => {
          if(response.status == 200){
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          setPaymentInProgress(false);
          setOrderPlaced(true);
        })
        .catch((error) => {
          console.error("error : " + error);
        }) ;
      //  const orderData = await orderResponse.json();
      } else {
        // Payment failed
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      // Payment process completed
      
    }
  };

  return (
    <div className="content-wrapperr">
      <div className="payment-container">
        <h1 className="payment-heading">Payment Page</h1>
        <div className="payment-details">
          <p className="amount-label">Amount Payable:</p>
          <p className="amount-value">₹{amount}</p>
        </div>
        {paymentInProgress ? (
          <p className="payment-status">Processing payment...</p>
        ) : orderPlaced ? (
          <div>
            <p className="payment-status success">
            <img src="/success.png" style={{width:"20px", height:"20px"}}></img>
                  Order placed successfully!
            </p>
            <Link to="/"><button className="btn btn-primary">Go to home</button></Link>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
