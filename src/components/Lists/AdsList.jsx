import React from "react";
import SingleAdCard from "../Cards/SingleAdCard";
import css from "./AdsList.module.css";

function AdsList() {
  return (
    <div className={css.container}>
      <SingleAdCard />
    </div>
  );
}

export default AdsList;
