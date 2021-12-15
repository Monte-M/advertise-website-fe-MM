import React, { useEffect, useState } from "react";
import { getFetchData } from "../../utils/fetch";
import SingleAdCard from "../Cards/SingleAdCard";
import Pagination from "../UI/Pagination/Pagination";
import css from "./AdsList.module.css";

const sortyByArr = [
  { id: 1, sort: "price" },
  { id: 2, sort: "date" },
  { id: 3, sort: "city" },
];

function AdsList() {
  const [itemsArr, setItemsArr] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [sortType, setSortType] = useState("");
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
  const paginate = (pageNumber) => {
    setCurrentItem(pageNumber);
    console.log(pageNumber);
  };

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        price: "price",
        city: "city",
      };
      const sortProperty = types[type];
      const sorted = [...itemsArr].sort((a, b) =>
        a[sortProperty] < b[sortProperty] ? -1 : 1
      );
      setItemsArr(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

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
        <h2>Sort by: </h2>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value='price'>Price</option>
          <option value='city'>City</option>
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
