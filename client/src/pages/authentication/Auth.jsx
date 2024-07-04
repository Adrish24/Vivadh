import { useEffect, useState } from "react";
import Login from "../../components/auth/Login";
import SignUp from "../../components/auth/SignUp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(false);
  const { currentUser } = useSelector((state) => state.Auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="m-auto w-[700px] bg-white flex rounded-2xl relative select-none border border-neutral-400">
      <div className="w-1/2 p-5 overflow-hidden">
        <Login hasAccount={hasAccount} />
      </div>
      <div className="w-1/2 p-5 overflow-hidden">
        <SignUp hasAccount={hasAccount} />
      </div>
      <div
        className={`
      absolute 
      top-0 
      ${hasAccount ? "left-1/2" : ""}
      w-[50%] 
      h-full
      `}
      >
        <div
          className={`
        relative  
        w-full h-full 
        flex 
        justify-center 
        items-center bg-gradient-to-tr from-neutral-950 from-20% to-slate-500
        overflow-hidden  
        duration-500 
        ease-in-out 
        ${
          hasAccount
            ? "translate-x-0 rounded-r-2xl "
            : "-translate-x-full rounded-l-2xl left-full"
        }
        `}
        >
          <div
            className={`absolute top-0 w-full h-full p-5 flex flex-col items-center justify-center duration-500 ease-in-out ${
              hasAccount ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-2xl  font-logo mb-5">Already have account ?</h2>
            <button
              className="
            px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold text-lg font-word
            "
              onClick={() => setHasAccount(true)}
            >
              Log In
            </button>
          </div>
          <div
            className={`absolute top-0 w-full h-full p-5 flex flex-col items-center justify-center duration-500 ease-in-out ${
              hasAccount ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <h2 className="text-2xl  font-logo mb-5">Creat new account</h2>
            <button
              className="
            px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-semibold text-lg font-word
            "
              onClick={() => setHasAccount(false)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
