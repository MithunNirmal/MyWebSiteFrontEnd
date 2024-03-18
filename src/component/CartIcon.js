// CartIcon.js

import React from "react";

const CartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="bi bi-cart-plus"
      viewBox="0 0 24 24"
    >
      <path d="M4.667 3.333A1.333 1.333 0 1 1 3.333 2a1.333 1.333 0 0 1 1.334 1.333zM10 4.667a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667zM21.333 4.667a1.333 1.333 0 1 0-1.334-2.667 1.333 1.333 0 0 0 1.334 2.667zM16.223 20.723a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8zM5.12 18.023l-.31 1.864a2.4 2.4 0 0 0 2.364 2.778h8.852a2.4 2.4 0 0 0 2.365-2.778l-.31-1.864M12 9.333V6M9.333 9.333V6M14.667 9.333V6" />
    </svg>
  );
};

export default CartIcon;