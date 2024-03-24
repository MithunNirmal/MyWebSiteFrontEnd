import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Carousel } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import backgroundImage from "../files/bgm.jpg"; // Import the local image file
import UrlContext from "../contexts/UrlContext";
import { CartContext } from "../contexts/CartContext";

const MerchandisePage = () => {
  const [merchandise, setMerchandise] = useState([]);
//  const [cart, setCart] = useState([]);
  const {cart, addToCart} = useContext(CartContext);
  const navigate = useNavigate();
  const url = useContext(UrlContext);
  const {token} = useContext(UserContext)
 
  useEffect(() => {
    fetch(url.domain + "/api/v1/public/products", {
      method: "GET",
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("jwt"), // Append the token to the Authorization header
      //   "Content-Type": "application/json" // Set content type if needed
      // }
    })
      .then((response) => response.json())
      .then((data) => {
        setMerchandise(data)
      })
      .catch((error) => console.error("Error fetching merchandise:", error));
  }, []);

  // const handleViewCart = () => {
  //   navigate("/cart", { state: { cart } });
  // };

  const handleAddToCart = (item) => {
    const itemToAdd = {
      "productId" : item.id,
      "name" : item.productName,
      "imageLink" : item.imageLinks[0],
      "price" : item.price,
      "productType" : "DELIVERABLE",
    }
    addToCart(itemToAdd);
  }

  return (
    <div className="content-wrapper"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use local image file
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 is 50% opacity)
        minHeight: "100vh",
      }}>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{color: "white"}}>Merchandise</h2>
          

        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {merchandise.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100 w-100">
                {item.imageLinks.length > 0 ? (
                  <Carousel>
                    {item.imageLinks.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={image}
                          alt={item.name}
                          style={{ height: "200px", width:"200px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src="https://via.placeholder.com/200"
                    alt="Placeholder"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: "1rem"}}>
                    {item.productName}
                  </h5>
                  <p className="card-text" style={{ fontSize: "0.8rem" }}>
                    Price: ${item.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn btn-primary btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchandisePage;
