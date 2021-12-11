import React from "react";
import css from "./SellerInfo.module.css";
import SellerInfoSingle from "./SellerInfoSingle";

// const sellerInfoArr = [
//   { id: 1, title: "Phone number", icon: "fa-phone", text: "+37060685258" },
//   { id: 2, title: "Email", icon: "fa-envelope", text: "juozas@gmail.com" },
// ];

function SellerInfo({ image, username, phone, email, city }) {
  return (
    <div className={css.container}>
      <h2>Seller Info:</h2>
      <img src={image} alt='' />
      <h2 className={css.username}>{username}</h2>

      <SellerInfoSingle title='Phone number' text={phone} />
      <SellerInfoSingle title='Email' text={email} />
      <SellerInfoSingle title='City' text={city} />
    </div>
  );
}

export default SellerInfo;
