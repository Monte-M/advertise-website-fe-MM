import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthContext";
import { postAuthenticatedFetch } from "../../utils/fetch";
import Icon from "../UI/Icons/Icon";
import css from "./MyFavoritesSingleAdCard.module.css";

const beURL = process.env.REACT_APP_BE_API;

function MyFavoritesSingleAdCard({ item, date }) {
  const [favorited, setFavorited] = useState(item.favorite_id);
  const history = useHistory();
  const authCtx = useAuthCtx();
  const user_id = authCtx.id;
  const token = authCtx.token;
  const dateOptions = {
    dateStyle: "medium",
    timeStyle: "medium",
  };

  const badDate = new Date(date);
  const goodDate = badDate.toLocaleString("lt-Lt", dateOptions);

  const handleFavorites = async (e) => {
    e.preventDefault();
    const dataToSend = { user_id: user_id, favorite_item: item.item_id };
    const data = await postAuthenticatedFetch(
      `${beURL}/favorites`,
      dataToSend,
      token
    );
    if (data.msg === "favorite added") {
      toast.success("Successfully added to favorites");
      setFavorited(true);
    }
    if (data.msg === "favorite removed") {
      toast.success("Successfully removed from favorites");
      setFavorited(false);
    }
  };

  return (
    <div className={css.container}>
      <Link to={`/single/${item.item_id}`}>
        <div className={css.imgContainer}>
          <div onClick={handleFavorites}>
            {favorited ? <Icon icon='fa-heart' /> : <Icon icon='fa-heart-o' />}
          </div>

          <img src={`${beURL}/ad-img/` + item.image} alt='' />
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

export default MyFavoritesSingleAdCard;
