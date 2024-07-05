/* eslint-disable react/prop-types */
import cardMenu from "../../../props/cardmenu";
import { useDispatch, useSelector } from "react-redux";
import { updateFavs } from "../../../redux/data/favsSlice";
import { cardMenu_container } from "../../../styles/card_view";
import Menu from "./Menu";
import axios from "axios";
import { useState } from "react";
import { setSinglePost } from "../../../redux/data/singlePostSlice";

const CardMenu = ({
  handlePropagation,
  single,
  isSingle,
  isFav,
}) => {

  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  // updating  states on click
  const handleMenuItemClick = async(e, item) => {
    handlePropagation(e);
    // handling favourites method
    if (item === "Favourite") {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://vivadh.onrender.com/favorites",
          {
            single: single,
            currentUserId: currentUser?._id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data.success) {
          console.log(res.data.message);
          if(isSingle){
            dispatch(setSinglePost(res.data?.data))
          }else{
            dispatch(updateFavs(res.data?.data));
          }
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
  };

  return (
    <div onClick={(e) => handlePropagation(e)} className={cardMenu_container}>
      {cardMenu &&
        cardMenu.map((item) => (
          <Menu
            key={item}
            item={item}
            isFav={isFav}
            handleMenuItemClick={handleMenuItemClick}
            loading={loading}
          />
        ))}
    </div>
  );
};

export default CardMenu;
