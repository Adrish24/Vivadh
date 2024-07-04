import { Navbar, Sidebar } from "../ui";
import { Outlet } from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
import Submit from "../components/create/Submit";
import { Create, Modal } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { setCurrentUser } from "../redux/data/authSlice";

const Layout = () => {
  const { progress } = useSelector((state) => state.IsLoading);
  const { currentUser } = useSelector((state) => state.Auth);

  const [isCreate, setIsCreate] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    dispatch(setCurrentUser(user));
  }, []);

  return (
    <div>
      <LoadingBar color="#f11946" progress={progress} />
      <Navbar />
      <div className="flex h-screen pt-[60px]">
        <Sidebar />
        <div className="w-full flex overflow-y-auto bg-black text-white">
          <Outlet />
        </div>
        {currentUser?._id && <Create setIsCreate={setIsCreate} />}
        {isCreate && (
          <Modal Component={Submit} componentProps={{ setIsCreate }} />
        )}
      </div>
    </div>
  );
};

export default Layout;
