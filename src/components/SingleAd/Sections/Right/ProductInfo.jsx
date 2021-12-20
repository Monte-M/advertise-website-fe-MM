import React from "react";
import css from "./ProductInfo.module.css";
import ProductInfoSingle from "./ProductInfoSingle";

function ProductInfo({ description, category }) {
  return (
    <div className={css.container}>
      <h2>Product Info:</h2>
      <div>
        <ProductInfoSingle title='Condition' description={description} />
        <ProductInfoSingle title='Category' description={category} />
      </div>
    </div>
  );
}

export default ProductInfo;
