import React from "react";
import css from "./MiddleSection.module.css";

function MiddleSection({ image, description }) {
  console.log(image);
  return (
    <div>
      <div className={css.container}>
        <img src={`http://localhost:3001/ad-img/` + image} alt='' />
      </div>
      <div className={css.description}>
        <h2>Description:</h2>
        <h4>{description}</h4>
      </div>
    </div>
  );
}

export default MiddleSection;
