import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//import albumsData from "./albumsData"; // Assuming you have album data
import backgroundImage from "../files/bgm.jpg"; // Import the local image file
import "../css/RunningText.css"
import UrlContext from "../contexts/UrlContext";
import { CartContext } from "../contexts/CartContext";

const DiscographyPage = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const  url = useContext(UrlContext);
  const {cart, addToCart} = useContext(CartContext);

  useEffect(() => {

    fetch(url.domain +"/api/v1/album/public/albumsGDrive", {})
    .then((response) => {
      if(response.status == 200) {
       return response.json(); 
      }
      else{
        console.log("response status " + response.status);
        return null;
      }
    })
    .then((data) => {
      if(data){
        setAlbums(data);
        console.log(data);
      }
    })
    .catch((error) => console.log(error));
    // Simulate fetching albums data
    // setTimeout(() => {
    //   setAlbums(albumsData);
    // }, 1000);
  }, []);


  const handleAddToCart = (album) => {
      const itemToAdd = {
        "productId" : album.id,
        "name" : album.name,
        "imageLink" : album.coverLink,
        "price" : 0,
        "productType" : "DOWNLOADABLE",
      }
      addToCart(itemToAdd);
  }


  return (
    <div
      className="discography-page content-wrapper"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use local image file
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 is 50% opacity)
        minHeight: "100vh",
      }}
    >
      <div className="container mt-1">
        <h2 className="text-center mb-4" style={{color:"white"}} >Discography</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"> {/* Adjust column size here */}
          {albums.map((album) => (
            
              <div key={album.id} className="col">
                <div className="card h-100" style={{backgroundColor:"#2f847c"}}> 
                  <Link to={`/album/${album.id}`}>
                    <img
                      src={album.coverLink}
                      alt={album.name}
                      className="card-img-top"
                      style={{ height: "100%", width:"100%", objectFit: "cover" }} // Adjust card image size
                    />
                  </Link>
                  <div className="card-body">
                    <div className="row ">
                    <h5 className="card-title text-overflow col-sm-6 col-md-7" style={{ fontSize: "1rem",  width:"50%"}}
                    onClick={()=> navigate("/album/" + album.id)}>
                      
                      {album.name}
                    </h5>
                    <p className="card-text col-2 col-md-4" style={{ fontSize: "0.8rem",fontWeight:"bold", textAlign:"right", width:"50%"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-disc" viewBox="0 0 20 20" >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0M8 4a4 4 0 0 0-4 4 .5.5 0 0 1-1 0 5 5 0 0 1 5-5 .5.5 0 0 1 0 1m4.5 3.5a.5.5 0 0 1 .5.5 5 5 0 0 1-5 5 .5.5 0 0 1 0-1 4 4 0 0 0 4-4 .5.5 0 0 1 .5-.5"/>
                      </svg>
                      {album.type}
                    </p>
                    </div>
                    <p className="card-text" style={{ fontSize: "0.8rem"}}>
                      {album.primaryArtist}
                    </p>
                    <button onClick={() => {handleAddToCart(album)}} className="btn btn-secondary btn-sm">
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

export default DiscographyPage;
