import React from "react";
import { Link } from "react-router-dom";
import Icon from "../UI/Icons/Icon";
import css from "./SingleAdCard.module.css";
function SingleAdCard() {
  return (
    <Link to='/single'>
      <div className={css.container}>
        <div className={css.imgContainer}>
          <img
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzafaire.com%2Fwp-content%2Fuploads%2F2020%2F07%2FMacBook_Pro_16-in_Touch_Bar_Pure_Top_Open_Space_Gray.png&f=1&nofb=1'
            alt=''
          />
        </div>
        <div className={css.adContainer}>
          <h2>HD Laptop</h2>
          <div className={css.singleTitle}>
            <Icon icon='fa-clock-o ' />
            <h4>4 years ago</h4>
          </div>
          <div className={css.singleTitle}>
            <Icon icon='fa-clock-o ' />
            <h4>Port Chester, New York</h4>
          </div>
          <div className={css.singleTitle}>
            <Icon icon='fa-clock-o ' />
            <h4>Computer / tablets</h4>
          </div>
          <div className={css.singleTitle}>
            <Icon icon='fa-clock-o ' />
            <h4>1000 views</h4>
          </div>
          <h2>$2500</h2>
        </div>
      </div>
    </Link>
  );
}

export default SingleAdCard;
