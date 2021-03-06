import React from "react";
import css from "./SellerInfo.module.css";
import SellerInfoSingle from "./SellerInfoSingle";

function SellerInfo({ image, username, phone, email, city }) {
  return (
    <div className={css.container}>
      <div className={css.userInfo}>
        <h2>Seller Info:</h2>
        <img src={image} alt='' />
        <h2 className={css.username}>{username}</h2>
      </div>
      <div className={css.listContainer}>
        <SellerInfoSingle title='Phone number' text={phone} />
        <SellerInfoSingle title='Email' text={email} />
        <SellerInfoSingle title='City' text={city} />
      </div>
    </div>
  );
}

export default SellerInfo;
