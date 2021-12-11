import React, { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { getAuthenticatedFetchData } from "../../utils/fetch";
import MySingleAdCard from "../Cards/MySingleAdCard";
import css from "./MyAdsList.module.css";

function MyAdsList() {
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
    console.log(data);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className={css.container}>
      {itemsArr.map((item) => (
        <MySingleAdCard key={item.id} item={item} date={item.post_timestamp} />
      ))}
    </div>
  );
}

export default MyAdsList;
