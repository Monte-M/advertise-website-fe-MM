import React from "react";
import css from "./SellerInfo.module.css";
import SellerInfoSingle from "./SellerInfoSingle";

const sellerInfoArr = [
  { id: 1, title: "Phone number", icon: "fa-phone", text: "+37060685258" },
  { id: 2, title: "Email", icon: "fa-envelope", text: "juozas@gmail.com" },
];

function SellerInfo() {
  return (
    <div className={css.container}>
      <h2>Seller Info:</h2>
      <img
        src='https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?size=626&ext=jpg&ga=GA1.2.2106915990.1626480000'
        alt=''
      />
      <h2 className={css.username}>Username</h2>
      {sellerInfoArr.map(({ title, icon, text, id }) => (
        <SellerInfoSingle title={title} icon={icon} text={text} key={id} />
      ))}
    </div>
  );
}

export default SellerInfo;
