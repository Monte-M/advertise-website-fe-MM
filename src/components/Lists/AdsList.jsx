import React, { useEffect, useState } from "react";
import { getFetchData } from "../../utils/fetch";
import SingleAdCard from "../Cards/SingleAdCard";
import Pagination from "../UI/Pagination/Pagination";
import css from "./AdsList.module.css";

function AdsList() {
  const [itemsArr, setItemsArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [catId, setCatId] = useState([]);
  const [currentItem, setCurrentItem] = useState(1);
  const [itemsPerPage] = useState(6);

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

  // get current items
  const indexOfLastItem = currentItem * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsArr.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber, e) => {
    setCurrentItem(pageNumber);
    console.log(pageNumber);
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
        {currentItems.map((item) => (
          <SingleAdCard key={item.id} item={item} date={item.post_timestamp} />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={itemsArr.length}
        paginate={paginate}
      />
    </div>
  );
}

export default AdsList;
