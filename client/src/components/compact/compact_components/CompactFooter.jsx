/* eslint-disable react/prop-types */
import { GrExpand, GrClose } from "react-icons/gr";

import { Vote } from "../../../components";

import cardMenu from "../../../props/cardmenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateFavs } from "../../../redux/data/favsSlice";
import { optionStyle, option_expand } from "../../../styles/compact_view";
import CompactBody from "./CompactBody";
import CompactMenu from "./CompactMenu";
import axios from "axios";

const CompactFooter = ({
  single,
  array,
  setArray,
  handlePropagation,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);


  const { currentUser } = useSelector((state) => state.Auth);
  const { favs } = useSelector((state) => state.Favs);

  const dispatch = useDispatch();

  // updating states on click
  const handleOptionsClick = async (e, item) => {
    handlePropagation(e);

    if (item === "Favourite") {
      setLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:5000/favorites",
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
          dispatch(updateFavs(res.data?.data));
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
  };

  const expandContent = (e) => {
    handlePropagation(e);
    setExpand(!expand);
  };

  // checking favourite status for posts
  useEffect(() => {
    const findFav = favs?.some((f) => f._id === single._id);
    if (findFav) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [favs]);

  return (
    <div className="flex flex-col">
      <div className={`flex ${expand ? "mb-2" : ""}`}>
        {/* post expand */}
        <button
          title="Expand"
          onClick={expandContent}
          className={option_expand}
        >
          {expand ? <GrClose size={20} /> : <GrExpand size={20} />}
        </button>

        <Vote
          single={single}
          array={array}
          setArray={setArray}
          handlePropagation={handlePropagation}
        />

        {/* Card comments count */}
        <button className={optionStyle}>
          <span className="text-xs mr-1.5">{single.comments_count}</span>
          <span>comments</span>
        </button>

        {/* share */}
        <button className={optionStyle}>
          <span>Share</span>
        </button>

        {/* options */}
        {cardMenu.map((item) => (
          <CompactMenu
            key={item}
            item={item}
            isFav={isFav}
            handleOptionsClick={handleOptionsClick}
            loading={loading}
          />
        ))}
      </div>
      {expand && <CompactBody single={single} />}
    </div>
  );
};

export default CompactFooter;
