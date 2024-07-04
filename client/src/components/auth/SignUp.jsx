/* eslint-disable react/prop-types */
import { useState } from "react";
import FormField from "./FormField";
import { VscLoading } from "react-icons/vsc";
import delay from "../../utls/delay";
import axios from "axios";

const SignUp = ({ hasAccount }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (form.password === form.confirmPassword) {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/signup",
          form,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        await delay(1000);
        if (res.data.success) {
          alert(res.data.message);
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
          confirmPassword: "",
        });
      }
    } else {
      alert("passwords do not match");
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className={`${
        hasAccount && "-translate-x-[100%]"
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
        <FormField
          labelName="Re-enter Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
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
            <span>Sign Up</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
