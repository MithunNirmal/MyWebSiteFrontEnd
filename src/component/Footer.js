import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-2 fixed-bottom"> {/* Reduced padding */}
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <p className="small mb-0" style={{ fontSize: '0.8rem' }}> {/* Reduced font size */}
              &copy; {new Date().getFullYear()} Mithun Nirmal. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
