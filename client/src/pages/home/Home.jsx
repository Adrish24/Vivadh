import { Card, Compact, FilterPost } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setToggleSelectButton } from "../../redux/slices/toggleSelectButton";
import { setPosts } from "../../redux/data/postsSlice";
import fetcher from "../../lib/fetcher";
import { setFavs } from "../../redux/data/favsSlice";
import { setSinglePost } from "../../redux/data/singlePostSlice";


const Home = () => {
  const { posts } = useSelector((state) => state.Posts);
  const { currentUser } = useSelector((state) => state.Auth);
  // const { favs } = useSelector((state) => state.Favs);
  const { view } = useSelector((state) => state.Filter);
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      const res = await fetcher(
        `https://vivadh.onrender.com/post/?currentUserId=${currentUser._id}`
      );
      if (res.success) {
        dispatch(setPosts(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavs = async () => {
    try {
      const res = await fetcher(
        `https://vivadh.onrender.com/favorites/?currentUserId=${currentUser._id}`
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
    if (currentUser && currentUser._id) {
      // console.log(currentUser._id);
      fetchPosts();
      fetchFavs();
      dispatch(setSinglePost(null));
      dispatch(setToggleSelectButton("Home"));
    }
  }, [currentUser]);

  // useEffect(() => {
  //   if (currentUser && currentUser?._id) console.log(favs);
  // }, [favs]);

  useEffect(() => {
    if (posts?.length > 0) {
      console.log(posts);
    }
  }, [posts]);

  return (
    <div
      className={`
    ${view === "Card" ? "w-[700px] mx-auto" : "w-full px-4"}
    `}
    >
      <FilterPost />
      {posts?.length > 0 ? (
        posts.map((post) =>
          view === "Card" ? (
            <Card
              key={post._id}
              single={post}
              array={posts}
              setArray={setPosts}
              isSingle={false}
            />
          ) : (
            <Compact
              key={post._id}
              single={post}
              array={posts}
              setArray={setPosts}
            />
          )
        )
      ) : (
        <div className="w-full text-center py-10 text-xl">
          <h1>Something went wrong or server starting... (within 50 seconds)</h1>
        </div>
      )}
      <div className="h-32 w-full">No post available</div>
    </div>
  );
};

export default Home;
