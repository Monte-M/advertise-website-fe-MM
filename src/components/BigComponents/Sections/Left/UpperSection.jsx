import React from "react";
import Icon from "../../../UI/Icons/Icon";
import css from "./UpperSection.module.css";

function UpperSection({ title, price, date, city }) {
  const dateOptions = {
    dateStyle: "medium",
    timeStyle: "medium",
  };
  const badDate = new Date(date);
  const goodDate = badDate.toLocaleString("lt-Lt", dateOptions);
  return (
    <div>
      <div className={css.titleContainer}>
        <h2>{title}</h2>
        <h1 className={css.price}>$ {price}</h1>
      </div>
      <div className={css.topContainer}>
        <div className={css.singleTitle}>
          <Icon icon='fa-clock-o ' />
          <h4>{goodDate}</h4>
        </div>
        <div className={css.singleTitle}>
          <Icon icon='fa-map-marker' />
          <h4>{city}</h4>
        </div>
      </div>
    </div>
  );
}

export default UpperSection;
