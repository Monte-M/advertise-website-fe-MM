import React from "react";
import MiddleSection from "./Sections/MiddleSection";
import UpperSection from "./Sections/UpperSection";
import css from "./SingleAd.module.css";

function SingleAd() {
  return (
    <div className={css.container}>
      <UpperSection />
      <MiddleSection />
    </div>
  );
}

export default SingleAd;
