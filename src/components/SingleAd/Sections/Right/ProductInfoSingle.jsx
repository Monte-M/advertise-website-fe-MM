import React from "react";
import css from "./ProductInfoSingle.module.css";

function ProductInfoSingle({ title, description }) {
  return (
    <div className={css.container}>
      <div className={css.specifics}>
        <h4>{title}: </h4>
        <h4 className={css.highlight}>{description}</h4>
      </div>
    </div>
  );
}

export default ProductInfoSingle;
