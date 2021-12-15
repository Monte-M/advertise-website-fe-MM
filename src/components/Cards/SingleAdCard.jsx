import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthContext";
import { postAuthenticatedFetch } from "../../utils/fetch";

import Icon from "../UI/Icons/Icon";
import css from "./SingleAdCard.module.css";
function SingleAdCard({ item, date }) {
  const authCtx = useAuthCtx();
  const loggedIn = authCtx.isLoggedIn;
  const user_id = authCtx.id;
  const token = authCtx.token;

  const dateOptions = {
    dateStyle: "medium",
    timeStyle: "medium",
  };

  const handleFavorites = async (e) => {
    e.preventDefault();
    const dataToSend = { user_id: user_id, favorite_item: item.id };
    const data = await postAuthenticatedFetch(
      "http://localhost:3001/favorites",
      dataToSend,
      token
    );
    console.log(data);
    if (data.msg === "favorite added") {
      toast.success("Successfully added to favorites");
    }
    if (data.msg === "favorite removed") {
      toast.success("Successfully removed from favorites");
    }
  };

  const badDate = new Date(date);
  const goodDate = badDate.toLocaleString("lt-Lt", dateOptions);
  return (
    <div className={css.container}>
      <Link to={`/single/${item.id}`}>
        <div className={css.imgContainer}>
          {loggedIn && (
            <div onClick={handleFavorites}>
              <Icon icon='fa-heart-o' />
            </div>
          )}

          <img src={`http://localhost:3001/ad-img/` + item.image} alt='' />
        </div>
        <div className={css.adContainer}>
          <h2>{item.title}</h2>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-clock-o' />
            </div>

            <h4>{goodDate}</h4>
          </div>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-map-marker' />
            </div>

            <h4>{item.city}</h4>
          </div>
          <div className={css.singleTitle}>
            <div>
              <Icon icon='fa-tasks ' />
            </div>

            <h4>{item.category}</h4>
          </div>

          <h2 className={css.highlight}>$ {item.price}</h2>
        </div>
      </Link>
    </div>
  );
}

export default SingleAdCard;
