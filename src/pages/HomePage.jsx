import React from "react";

import AdsList from "../components/Lists/AdsList";
import css from "./styles/HomePage.module.css";

function HomePage() {
  return (
    <div className='container'>
      <h1 className={css.container}>All Ads</h1>
      <AdsList />
    </div>
  );
}

export default HomePage;
