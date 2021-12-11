import React, { useEffect, useState } from "react";
import { getFetchData } from "../../utils/fetch";
import SingleAdCard from "../Cards/SingleAdCard";
import css from "./AdsList.module.css";

function AdsList() {
  const [itemsArr, setItemsArr] = useState([]);
  const getItems = async () => {
    const data = await getFetchData("http://localhost:3001/items");
    setItemsArr(data.data);
  };

  console.log(itemsArr);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className={css.container}>
      {itemsArr.map((item) => (
        <SingleAdCard key={item.id} item={item} date={item.post_timestamp} />
      ))}
    </div>
  );
}

export default AdsList;
