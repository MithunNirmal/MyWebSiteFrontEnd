import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import albumsData from "./albumsData"; // Assuming you have album data
import backgroundImage from "../files/bgm.jpg"; // Import the local image file
import "../css/RunningText.css"

const DiscographyPage = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch("http://localhost:8080/api/v1/album/albumsGDrive", {})
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
      <div className="container mt-4">
        <h2 className="text-center mb-4" style={{color:"white"}} >Discography</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"> {/* Adjust column size here */}
          {albums.map((album) => (
            
              <div key={album.id} className="col">
                <div className="card h-100" style={{backgroundColor:"#2f847c"}}> 
                <Link to={`/albums/${album.id}`}>
                  <img
                    src={album.coverLink}
                    alt={album.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }} // Adjust card image size
                  />
                </Link>
                  <div className="card-body">
                    <div className="row ">
                    <h5 className="card-title text-overflow col-sm-6 col-md-7" style={{ fontSize: "1rem" }}
                    onClick={()=> navigate("/albums/" + album.id)}>
                      {album.name}
                    </h5>
                    <p className="card-text col-2 col-md-4" style={{ fontSize: "0.8rem", textAlign:"right"}}>
                      {album.type}
                    </p>
                    </div>
                    <p className="card-text" style={{ fontSize: "0.8rem"}}>
                      {album.primaryArtist}
                    </p>
                    <button onClick={() => {console.log("clicked")}} className="btn btn-secondary btn-sm">
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
