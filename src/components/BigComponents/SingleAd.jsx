import React from "react";
import MiddleSection from "./Sections/Left/MiddleSection";
import SellerInfo from "./Sections/Right/SellerInfo";
import UpperSection from "./Sections/Left/UpperSection";
import css from "./SingleAd.module.css";
import ProductInfo from "./Sections/Right/ProductInfo";

function SingleAd() {
  return (
    <div className={css.container}>
      <div className={css.containerLeft}>
        <UpperSection />
        <MiddleSection />
      </div>
      <div>
        <ProductInfo />
        <SellerInfo />
      </div>
    </div>
  );
}

export default SingleAd;
