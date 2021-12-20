import React from "react";
import css from "./MiddleSection.module.css";

const beURL = process.env.REACT_APP_BE_API;

function MiddleSection({ image, description }) {
  return (
    <div>
      <div className={css.container}>
        <img src={`${beURL}/ad-img/` + image} alt='' />
      </div>
      <div className={css.description}>
        <h2>Description:</h2>
        <h4>{description}</h4>
      </div>
    </div>
  );
}

export default MiddleSection;
