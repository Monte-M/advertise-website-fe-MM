import React from "react";
import css from "./Footer.module.css";
function Footer() {
  return (
    <div className={css.footer}>
      <div className={css.container}>
        <h4>
          &#169; Copyright 2021. Designed and Developed by Mantas Matelionis.
        </h4>
        <h4>Kaunas, Lithuania</h4>
      </div>
    </div>
  );
}

export default Footer;
