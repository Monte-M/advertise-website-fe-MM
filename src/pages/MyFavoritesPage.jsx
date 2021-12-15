import React from "react";

import MyFavoritesList from "../components/Lists/MyFavoritesList";
import css from "./styles/MyAdsPage.module.css";

function MyFavoritesPage() {
  return (
    <div className='container'>
      <h1 className={css.container}>My Favorites</h1>
      <MyFavoritesList />
    </div>
  );
}

export default MyFavoritesPage;
