/* eslint-disable react/prop-types */
import { GrCircleAlert } from "react-icons/gr";
import Confirm from "../create/Confirm";
import Modal from "../modal/Modal";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComments } from "../../redux/data/commentsSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const string =
  "You have a comment in progress, are you sure you want to discard it ?";

const CommentInput = ({ user, postId }) => {
  const [form, setForm] = useState("");
  const [showBtns, setShowBtns] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [alert, setAlert] = useState("");

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = "20px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleClick = () => {
    if(user){
      setShowBtns(true);
    }else {
      navigate('/auth')
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (form === "") {
      setShowBtns(false);
      setForm("");
      setAlert("");
    } else {
      setConfirm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form === "") {
      setAlert("The field is required and cannot be empty");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/comments",
          { form, postId, user },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (res.data.success) {
          dispatch(updateComments(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
      if (inputRef.current) {
        inputRef.current.style.height = "20px";
      }
      setAlert("");
      setForm("");
      setShowBtns(false);
    }
  };

  return (
    <div className="px-3 mb-4">
      {/* Add a comment */}
      <form
        onSubmit={handleSubmit}
        className={`
        border 
        border-gray-500 
        border-opacity-50 
        rounded-3xl 
        py-2 
        px-4 
        mb-1.5 
        flex flex-col 
        items-center
        ${alert ? "outline outline-2 outline-red-500" : ""}
        `}
      >
        <div
          className={`${
            showBtns
              ? "w-full relative py-2 flex items-end"
              : "w-full flex items-center "
          }`}
        >
          <textarea
            ref={inputRef}
            value={form}
            onChange={handleChange}
            onClick={handleClick}
            id="Link"
            className={`
            w-full 
            h-5 
            text-sm 
            focus:outline-none  
            focus:ring-0 appearance-none 
            ${showBtns ? "" : "resize-none"}
            overflow-hidden 
            bg-transparent 
            `}
            placeholder="Add a comment"
          ></textarea>
        </div>
        {showBtns && (
          <div className="ml-auto flex gap-2 text-xs font-semibold text-neutral-200">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-2xl bg-blue-600 hover:bg-blue-500"
            >
              Comment
            </button>
          </div>
        )}

        {confirm && (
          <Modal
            Component={Confirm}
            componentProps={{
              setShow: setShowBtns,
              setConfirm: setConfirm,
              setForm: setForm,
              string: string,
            }}
          />
        )}
      </form>

      <div className="flex items-center px-4 text-xs">
        <span
          className={`mr-1 ${alert.trim() === "" ? "hidden" : "text-red-500"}`}
        >
          <GrCircleAlert />
        </span>
        <span className={`${alert.trim() === "" ? "" : "text-red-500"}`}>
          {alert}
        </span>
      </div>
    </div>
  );
};

export default CommentInput;
