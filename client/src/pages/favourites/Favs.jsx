import { useDispatch, useSelector } from "react-redux";
import { Card, Compact, FilterPost } from "../../components";
import { useEffect } from "react";
import { setFavs } from "../../redux/data/favsSlice";
import fetcher from "../../lib/fetcher";
import { setToggleSelectButton } from "../../redux/slices/toggleSelectButton";
import { setSinglePost } from "../../redux/data/singlePostSlice";


const Favs = () => {
  const { favs } = useSelector((state) => state.Favs);
  const { view } = useSelector((state) => state.Filter);
  const { currentUser } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const fetchFavs = async () => {
    try {
      const res = await fetcher(
        `http://localhost:5000/favorites/?currentUserId=${currentUser._id}`
      );
      if (res) {
        // console.log(res);
        dispatch(setFavs(res));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser?._id) {
      fetchFavs();
      dispatch(setSinglePost(null));
      dispatch(setToggleSelectButton("Favourites"));
    }
  }, [currentUser]);

  // useEffect(() => {
  //   console.log(favs);
  // }, [favs]);

  // useEffect(() => {
  //   console.log(posts)
  // },[posts])

  return (
    <div className={`${view === "Card" ? "w-[700px] mx-auto" : "w-full px-2 md:px-4"}`}>
      <FilterPost />
      {favs.length > 0 ? (
        favs.map((fav) =>
          view === "Card" ? (
            <Card
              key={fav._id}
              single={fav}
              array={favs}
              setArray={setFavs}
              isSingle={false}
            />
          ) : (
            <Compact
              key={fav._id}
              single={fav}
              array={favs}
              setArray={setFavs}
            />
          )
        )
      ) : (
        <div className="w-full text-center py-10 text-xl font-word">
          <h1>You have no favourite post</h1>
        </div>
      )}
    </div>
  );
};

export default Favs;
