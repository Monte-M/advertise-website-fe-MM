import React, { useEffect, useState } from "react";
import MiddleSection from "./Sections/Left/MiddleSection";
import SellerInfo from "./Sections/Right/SellerInfo";
import UpperSection from "./Sections/Left/UpperSection";
import css from "./SingleAd.module.css";
import ProductInfo from "./Sections/Right/ProductInfo";
import { getFetchData } from "../../utils/fetch";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function SingleAd() {
  const { id } = useParams();
  const [singleAd, setSingleAd] = useState([]);
  const getSinglePost = async () => {
    const data = await getFetchData(`http://localhost:3001/items/${id}`);
    setSingleAd(data.data);
  };

  useEffect(() => {
    getSinglePost();
    return () => {
      setSingleAd([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.container}>
      <div className={css.containerLeft}>
        <UpperSection
          title={singleAd[0]?.title}
          price={singleAd[0]?.price}
          city={singleAd[0]?.city}
          date={singleAd[0]?.post_timestamp}
        />
        {singleAd[0] && (
          <MiddleSection
            image={singleAd[0]?.image}
            description={singleAd[0]?.description}
          />
        )}
      </div>
      <div className={css.rightContainer}>
        <ProductInfo
          description={singleAd[0]?.item_condition}
          category={singleAd[0]?.category}
        />
        <SellerInfo
          image={singleAd[0]?.user_image}
          username={singleAd[0]?.username}
          phone={singleAd[0]?.phone_number}
          email={singleAd[0]?.email}
          city={singleAd[0]?.city}
        />
      </div>
    </div>
  );
}

export default SingleAd;
