import React from "react";
import css from "./SellerInfoSingle.module.css";

function SellerInfoSingle({ title, text }) {
  return (
    <div className={css.container}>
      <div className={css.iconContainer}>
        <h4>{title}:</h4>
      </div>
      <h4 className={css.contact}>{text}</h4>
    </div>
  );
}

export default SellerInfoSingle;
