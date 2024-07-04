/* eslint-disable react/prop-types */
import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import usePageNavigation from "../../hooks/usePageNavigation";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../../redux/data/authSlice";
import { setPosts } from "../../redux/data/postsSlice";
import { setFavs } from "../../redux/data/favsSlice";

const ProfileMenu = ({ user }) => {
  const { navigateToPage } = usePageNavigation(user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(setCurrentUser(null));
    dispatch(setPosts(null));
    dispatch(setFavs(null));
    dispatch(setCurrentUser(null));
    sessionStorage.removeItem("user");
  };

  return (
    <div className="absolute right-2 top-[52px] bg-neutral-900 py-2 text-sm whitespace-nowrap rounded-lg">
      <a
        onClick={() => navigateToPage(`/user/${user?.username}`, "")}
        className="px-5 py-2 flex items-center gap-2 hover:bg-neutral-800"
        href="#"
      >
        <span>
          <CgProfile size={24} />
        </span>
        <span className="text-lg font-word">{user?.username}</span>
      </a>
      <a
        className="px-5 py-2 flex items-center gap-2 hover:bg-neutral-800"
        href="#"
      >
        <span>
          <IoSettingsOutline size={24} />
        </span>
        <span>Settings</span>
      </a>
      <a
        onClick={handleLogOut}
        className="px-5 py-2 flex items-center gap-2 hover:bg-neutral-800"
        href="#"
      >
        <span>
          <IoExitOutline size={24} />
        </span>
        <span>Log Out</span>
      </a>
    </div>
  );
};

export default ProfileMenu;
