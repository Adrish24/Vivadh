import {
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useRef, useState } from "react";
import usePageNavigation from "../../hooks/usePageNavigation";

const NavMenu = () => {
  const { currentUser } = useSelector((state) => state.Auth);
  const { navigateToPage } = usePageNavigation();

  const [toggle, setToggle] = useState(false);
  const profileBtnRef = useRef(null);

  const handleToggle = () => {
    if (currentUser) {
      setToggle(!toggle);
    } else {
      navigateToPage(`/auth`, "");
    }
  };

  const handleOutsideClick = (e) => {
    if (profileBtnRef.current && !profileBtnRef.current.contains(e.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className=" 
      sm:flex 
      items-center pl-4 hidden
      "
    >
      <button
        className="p-2  rounded-full hover:bg-slate-700"
        title="Open chat"
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </button>
      <button
        className="p-2  rounded-full hover:bg-slate-700"
        title="Open inbox"
      >
        <IoNotificationsOutline size={24} />
      </button>
      <button
        ref={profileBtnRef}
        onClick={handleToggle}
        className="p-0.5  rounded-full hover:bg-slate-700 relative"
        title="open profile menu"
      >
        <RxAvatar size={40} />
        {toggle && <ProfileMenu user={currentUser} />}
      </button>
    </div>
  );
};

export default NavMenu;
