/* eslint-disable react/prop-types */
import { useState } from "react";
import { BodyInput, SelectFlair, SelectTopic, TitleInput } from "./inputs";
import Modal from "../../modal/Modal";
import Confirm from "../Confirm";
import { VscLoading } from "react-icons/vsc";
import axios from "axios";
import delay from "../../../utls/delay";
import { useSelector } from "react-redux";

import { usePageNaigation } from "../../../hooks";

const string = "Do you want to discard this post ?";

const TextForm = ({ setShow }) => {
  const [form, setForm] = useState({
    topic: "",
    flair: "",
    title: "",
    body: "",
  });
  const [titleReq, setTitleReq] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { currentUser } = useSelector((state) => state.Auth);

  const { navigateToPage } = usePageNaigation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(form)

    try {
      const res = await axios.post(
        "https://vivadh.onrender.com/post/?type=text",
        { form: form, user: currentUser },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        console.log(res.data.data);
      }
      await delay(1000);
      navigateToPage(`/comments/${res.data.data._id}`, " ");
    } catch (error) {
      console.log(error);
    }
    setShow(false);
    setLoading(false);
  };

  return (
    <form className="px-4" onSubmit={handleSubmit}>
      {/* topic selection */}
      <SelectTopic form={form} setForm={setForm} />

      {/* title input */}
      <TitleInput {...{ isTyping, setIsTyping, setTitleReq, form, setForm }} />

      {/* flair selection */}
      <SelectFlair form={form} setForm={setForm} />

      <BodyInput {...{ isTyping, setIsTyping, form, setForm }} />

      <div className="flex justify-end gap-3 mt-2">
        <a
          onClick={() => setConfirm(true)}
          className="py-2 px-4 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-full cursor-pointer"
        >
          Discard
        </a>
        <button
          type="submit"
          className={`
        ${
          titleReq && form.body && form.topic && form.flair
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-neutral-800 text-neutral-500"
        }
        py-2 px-4 text-sm rounded-full
        `}
          disabled={
            titleReq && form.body && form.topic && form.flair ? false : true
          }
        >
          {loading ? (
            <VscLoading className=" animate-spin" />
          ) : (
            <span>Post</span>
          )}
        </button>
      </div>

      {confirm && (
        <Modal
          Component={Confirm}
          componentProps={{ setShow, setConfirm, string }}
        />
      )}
    </form>
  );
};

export default TextForm;
