import React, { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { getAuthenticatedFetchData } from "../../utils/fetch";
import MySingleAdCard from "../Cards/MySingleAdCard";
import Loader from "../UI/Loader/Loader";
import css from "./MyAdsList.module.css";

const beURL = process.env.REACT_APP_BE_API;

function MyAdsList() {
  const authCtx = useAuthCtx();
  const userId = authCtx.id;
  const token = authCtx.token;

  const [itemsArr, setItemsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getItems = async () => {
    const data = await getAuthenticatedFetchData(
      `${beURL}/items/user-items/${userId}`,
      token
    );
    setItemsArr(data.data);
    setIsLoading(true);
  };

  useEffect(() => {
    getItems();
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
              <MySingleAdCard
                key={item.id}
                item={item}
                date={item.post_timestamp}
              />
            ))
          ) : (
            <h2>You have no ads</h2>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MyAdsList;
