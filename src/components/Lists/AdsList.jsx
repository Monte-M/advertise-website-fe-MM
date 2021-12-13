import React, { useEffect, useState } from "react";
import { getFetchData } from "../../utils/fetch";
import SingleAdCard from "../Cards/SingleAdCard";
import css from "./AdsList.module.css";

function AdsList() {
  const [itemsArr, setItemsArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [catId, setCatId] = useState([]);

  const getItems = async () => {
    const data = await getFetchData("http://localhost:3001/items");
    setItemsArr(data.data);
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  const getSortedItems = async () => {
    const sortedData = await getFetchData(
      `http://localhost:3001/categories/${catId}`
    );
    setItemsArr(sortedData.data);
  };

  const getCategories = async () => {
    const categoriesData = await getFetchData(
      "http://localhost:3001/categories"
    );
    setCategoriesArr(categoriesData.data);
  };

  return (
    <div className={css.container}>
      <div className={css.categoryList}>
        <h2>Categories: </h2>
        <select
          className={css.select}
          onChange={(e) => setCatId(e.target.value)}
        >
          <option onClick={getItems} className={css.highlight}>
            Show All
          </option>
          {categoriesArr.map(({ id, category }) => (
            <option key={id} value={id} onClick={getSortedItems}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className={css.adsList}>
        {itemsArr.map((item) => (
          <SingleAdCard key={item.id} item={item} date={item.post_timestamp} />
        ))}
      </div>
    </div>
  );
}

export default AdsList;
