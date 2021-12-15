import React, { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { getAuthenticatedFetchData } from "../../utils/fetch";
import MyFavoritesSingleAdCard from "../Cards/MyFavoritesSingleAdCard";
import css from "./MyAdsList.module.css";

function MyFavoritesList() {
  const authCtx = useAuthCtx();
  const userId = authCtx.id;
  const token = authCtx.token;

  const [itemsArr, setItemsArr] = useState([]);
  const getItems = async () => {
    const data = await getAuthenticatedFetchData(
      `http://localhost:3001/items/user-items/${userId}`,
      token
    );
    setItemsArr(data.data);
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.container}>
      {itemsArr.map((item) => (
        <MyFavoritesSingleAdCard
          key={item.id}
          item={item}
          date={item.post_timestamp}
        />
      ))}
    </div>
  );
}

export default MyFavoritesList;
