import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../files/bgm.jpg";
import UrlContext from "../contexts/UrlContext";
import { CartContext } from "../contexts/CartContext";

const Album = () => {
  const { id } = useParams(); // Get the ID from the route params
  const url = useContext(UrlContext);
  const {cart, addToCart} = useContext(CartContext);

  const [albumData, setAlbumData] = useState({
    id: "",
    name: "",
    coverLink: "https://via.placeholder.com/200",
    primaryArtist: "",
    link: "",
    songs: [
      
    ],
    productType: "",
  });

  const handleAddToCart = () => {
    const itemToAdd = {
      "productId" : albumData.id,
      "name" : albumData.name,
      "imageLink" : albumData.coverLink,
      "price" : 0,
      "productType" : "DOWNLOADABLE",
    }
    addToCart(itemToAdd);
  }

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await fetch(`${url.domain}/api/v1/album/public/${id}`); // Replace 'your-api-endpoint' with your actual API endpoint
        if (response.ok) {
          const data = await response.json();
          setAlbumData(data);
        } else {
          throw new Error("Failed to fetch album data");
        }
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchAlbumData(); // Call the fetch function
  }, [id]);

  return (
    <>
    <div>
    <div className="content-wrapper" style={{
        backgroundImage:`url(${backgroundImage})`, backgroundSize: "cover",
       // backgroundPosition: "center",
        backgroundAttachment: "fixed",
        
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Adjust the opacity here (0.5 is 50% opacity)
        minHeight: "100vh",}}>
    <div className="container" style={{height:"100%" }}>
      <div className="row">
        <div className="col-sm " style={{maxWidth:"500px"}}>
          <div className="album-details " >
            <h1 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "30px", marginBottom:"10px", color:"white"}}>{albumData.name}</h1>
              <p style={{ fontWeight: "bold", marginTop: "", color:"white" }}>Artist: {albumData.primaryArtist}</p>
              <div>
                <img src={albumData.coverLink} alt={albumData.name} style={{ width: "100%", height: "100%", borderRadius:"10px" }} />
              </div>
              <div style={{paddingTop:"20px"}}>
                <button onClick={handleAddToCart} className="btn btn-secondary btn" >
                  Add to Cart
                </button>
              </div>
          </div>
        </div>

        <div className="square border-end border-secondary" style={{maxWidth:"2px", marginTop:"40px"}}></div>

        <div className="col-sm" style={{ paddingLeft:"5%", paddingRight:"5%", paddingTop:"7%" }}>
          <div className="" style={{ maxWidth:"100%", margin:"auto", height:"500px",backgroundColor:"rgba(47,132,124, 0.5)", borderRadius:"20px"}}>
            <p style={{marginTop:"30px", fontSize: "40px", fontWeight: "bold", textAlign:"center", color:"white"}}>Songs</p>
            <div className="container" style={{ maxHeight:"500px", overflowY:"auto"}}>
              {albumData.songs.map((song, index)=> (
                <div className="row square border-bottom border-dark" style={{padding:"5px", backgroundColor:"#2f847c"}}>
                  <div className="col-sm" style={{maxWidth:"5px", margin:"auto"}}>
                        <span style={{ fontWeight: "" }}>{index + 1}</span>
                  </div>
                  <div className="col-sm" style={{maxWidth:"50px"}}>
                    <img src={albumData.coverLink} style={{ width: "40px", height: "40px", borderRadius:"10px"}}></img>
                  </div>
                  <div className="col-sm" style={{textAlign:"center", margin:"auto", overflowX:"auto" ,whiteSpace:"nowrap", fontWeight:"bold",  maxWidth:"33%"}}>
                    {song.name}
                  </div>
                  <div className="col-sm" style={{ textAlign:"left", margin:"auto",  overflowX:"auto", whiteSpace:"nowrap", maxWidth:"33%"}}>
                    {song.artist}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default Album;
