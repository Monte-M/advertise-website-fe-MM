import React from "react";
import Icon from "../../UI/Icons/Icon";
import css from "./UpperSection.module.css";

function UpperSection() {
  return (
    <div>
      <h2>HD Laptop</h2>
      <div className={css.topContainer}>
        <div className={css.singleTitle}>
          <Icon icon='fa-clock-o ' />
          <h4>2021-05-08 16:50</h4>
        </div>
        <div className={css.singleTitle}>
          <Icon icon='fa-clock-o ' />
          <h4>Kaunas, Lithuania</h4>
        </div>
      </div>
    </div>
  );
}

export default UpperSection;
