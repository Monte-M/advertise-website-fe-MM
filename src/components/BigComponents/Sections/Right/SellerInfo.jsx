import React from "react";
import css from "./SellerInfo.module.css";
import SellerInfoSingle from "./SellerInfoSingle";

const sellerInfoArr = [
  { id: 1, title: "Phone number", icon: "fa-phone", text: "+37060685258" },
  { id: 2, title: "Email", icon: "fa-envelope", text: "juozas@gmail.com" },
];

function SellerInfo({ image }) {
  return (
    <div className={css.container}>
      <h2>Seller Info:</h2>
      <img src={image} alt='' />
      <h2 className={css.username}>Username</h2>
      {sellerInfoArr.map(({ title, icon, text, id }) => (
        <SellerInfoSingle title={title} icon={icon} text={text} key={id} />
      ))}
    </div>
  );
}

export default SellerInfo;
