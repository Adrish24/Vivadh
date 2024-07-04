/* eslint-disable react/prop-types */
import { useState } from "react";
import FormField from "./FormField";
import { VscLoading } from "react-icons/vsc";
import { usePageNaigation } from "../../hooks";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/data/authSlice";
import delay from "../../utls/delay";
import axios from "axios";

const Login = ({ hasAccount }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { navigateToPage } = usePageNaigation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });
      await delay(1000);
      if (res.data.success) {
        console.log(res.data.user);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(setCurrentUser(res.data.user));
        navigateToPage("/", "Home");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setForm({
        username: "",
        password: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={`${
        !hasAccount && "translate-x-[100%]"
      } duration-700 ease-in-out`}
    >
      <div className="flex flex-col gap-5 mb-5">
        <FormField
          labelName="Username"
          type="text"
          name="username"
          value={form.username}
          handleChange={handleChange}
        />
        <FormField
          labelName="Password"
          type="password"
          name="password"
          value={form.password}
          handleChange={handleChange}
        />
      </div>
      <div className="flex">
        <button
          type="submit"
          onClick={() => console.log("click")}
          className="mx-auto px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-3xl font-semibold text-lg font-word"
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <VscLoading className=" animate-spin" />
          ) : (
            <span>Log In</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default Login;
