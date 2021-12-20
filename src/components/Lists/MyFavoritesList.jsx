import React, { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { getAuthenticatedFetchData } from "../../utils/fetch";
import MyFavoritesSingleAdCard from "../Cards/MyFavoritesSingleAdCard";
import Loader from "../UI/Loader/Loader";
import css from "./MyFavoritesList.module.css";

const beURL = process.env.REACT_APP_BE_API;

function MyFavoritesList() {
  const authCtx = useAuthCtx();
  const userId = authCtx.id;
  const token = authCtx.token;

  const [itemsArr, setItemsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getFavorites = async () => {
    const data = await getAuthenticatedFetchData(
      `${beURL}/favorites/${userId}`,
      token
    );
    setItemsArr(data.data);
    setIsLoading(true);
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
      {isLoading ? (
        <>
          {itemsArr.length > 0 ? (
            itemsArr.map((item) => (
              <MyFavoritesSingleAdCard
                key={item.favorite_id}
                item={item}
                date={item.post_timestamp}
              />
            ))
          ) : (
            <h2>You have no favorites</h2>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MyFavoritesList;
