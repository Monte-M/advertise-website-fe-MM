import React from "react";
import css from "./ProductInfo.module.css";
import ProductInfoSingle from "./ProductInfoSingle";

const productInfo = [
  { id: 1, title: "Condition", description: "Used" },
  { id: 2, title: "Category", description: "Laptops" },
];

function ProductInfo() {
  return (
    <div className={css.container}>
      <h2>Product Info:</h2>
      {productInfo.map(({ id, title, description }) => (
        <ProductInfoSingle key={id} title={title} description={description} />
      ))}
    </div>
  );
}

export default ProductInfo;
