import React, { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { getAuthenticatedFetchData } from "../../utils/fetch";
import MyFavoritesSingleAdCard from "../Cards/MyFavoritesSingleAdCard";
import css from "./MyAdsList.module.css";

const beURL = process.env.REACT_APP_BE_API;

function MyFavoritesList() {
  const authCtx = useAuthCtx();
  const userId = authCtx.id;
  const token = authCtx.token;

  const [itemsArr, setItemsArr] = useState([]);
  const getFavorites = async () => {
    const data = await getAuthenticatedFetchData(
      `${beURL}/favorites/${userId}`,
      token
    );
    setItemsArr(data.data);
  };

  useEffect(() => {
    getFavorites();
    return () => {
      setItemsArr([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.container}>
      {itemsArr.map((item) => (
        <MyFavoritesSingleAdCard
          key={item.favorite_id}
          item={item}
          date={item.post_timestamp}
        />
      ))}
    </div>
  );
}

export default MyFavoritesList;
