import React from "react";
import { Link } from "react-router-dom";
import Icon from "../UI/Icons/Icon";
import css from "./SingleAdCard.module.css";
function SingleAdCard() {
  return (
    <div className={css.container}>
      <Link to='/single'>
        <div className={css.imgContainer}>
          <img
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzafaire.com%2Fwp-content%2Fuploads%2F2020%2F07%2FMacBook_Pro_16-in_Touch_Bar_Pure_Top_Open_Space_Gray.png&f=1&nofb=1'
            alt=''
          />
        </div>
        <div className={css.adContainer}>
          <h2>Macbook Pro 2021</h2>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-clock-o' />
            </div>

            <h4>1 years ago</h4>
          </div>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-map-marker' />
            </div>

            <h4>Kaunas, Lithuania</h4>
          </div>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-tasks ' />
            </div>

            <h4>Laptops</h4>
          </div>

          <h2 className={css.highlight}>$ 1500</h2>
        </div>
      </Link>
    </div>
  );
}

export default SingleAdCard;
