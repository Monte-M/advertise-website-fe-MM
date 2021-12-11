import React from "react";
import MyAdsList from "../components/Lists/MyAdsList";
import css from "./styles/MyAdsPage.module.css";

function MyAdsPage() {
  return (
    <div className='container'>
      <h1 className={css.container}>My Ads</h1>
      <MyAdsList />
    </div>
  );
}

export default MyAdsPage;
