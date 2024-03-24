import React from "react";
import backgroundImage from "../files/bgm.jpg";
import "../css/Home.css";

const Home = () => {
  return (
    <div
      className=" content-wrapper"
      style={{
        //width: "80%", height: "70%" ,
        backgroundImage: `url(${backgroundImage})`, // Use local image file
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity here (0.5 is 50% opacity)
        minHeight: "100vh",
      }}
    >
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mt-5" style={{color:"white"}}>
            <h1>Welcome to My Website</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              blandit libero.
            </p>
            {/* Add more content here */}
          </div>
        </div>
       <center>
        <div className="videoWrapper"  >
          <iframe src="https://www.youtube.com/embed?listType=playlist&list=UUW65BFIRS_e38gdC8dPHt6A"></iframe>
        </div>
        </center>
      </div>
      </div>
    </div>
  );
};

export default Home;
