import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start fixed-bottom">
      <div className="text-center ">
        <p className="m-1" style={{color:"white" , fontSize: '0.8rem'}}>
          &copy; {new Date().getFullYear()} Mithun Nirmal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
