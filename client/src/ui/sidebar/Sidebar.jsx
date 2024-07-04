import { useNavigate } from "react-router-dom";
import { _Home, _Favourites } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../redux/slices/loadingSlice";
import { setToggleSelectButton } from "../../redux/slices/toggleSelectButton";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.Auth);
  const { page } = useSelector((state) => state.Select);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelect = async (string) => {
    if (page === string) return;
    dispatch(setProgress(10));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    sessionStorage.setItem("page", string);
    if (string === "Home") navigate("/");
    if (string === "Favourites") navigate("/favourites");
    dispatch(setToggleSelectButton(string));
    dispatch(setProgress(100));
  };

  return (
    <div
      className="
    hidden 
    lg:flex 
    flex-col 
    w-72 p-4 
    bg-black text-white 
    border-r border-neutral-600
    "
    >
      {currentUser? (
        <>
          {/* Home */}
          <_Home handleSelect={handleSelect} page={page} />

          {/* Favourites */}
          <_Favourites handleSelect={handleSelect} page={page} />
        </>
      ) : (
        <div className="w-full text-center py-10 text-xl my-auto flex flex-col font-word">
          <span className="mb-4">You are not logged in</span>
          <button 
          onClick={() => navigate("/auth")}
          className="bg-cyan-500 py-2 px-4 mx-auto rounded-lg font-semibold">
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
