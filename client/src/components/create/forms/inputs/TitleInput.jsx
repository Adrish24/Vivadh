/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { GrCircleAlert } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import { title, titleInput, titleLabel } from "../../../../styles/create";

const TitleInput = ({ isTyping, setIsTyping, setTitleReq, form, setForm}) => {
  const [alert, setAlert] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const [outSideClick, setOutSideClick] = useState(false);

  const titleRef = useRef(null);
  const titleContainerRef = useRef(null);

  // focus text field
  const focusTextArea = () => {
    if (titleRef.current) {
      titleRef.current.focus();
      setOutSideClick(false);
    }
  };

  // reflecting user input in the text field
  const handleChange = (e) => {
    if (wordCount < 300) {
      setForm({ ...form, title: e.target.value });
    }

    if (titleRef.current) {
      titleRef.current.style.height = "20px";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  };

  // reflecting requirments for the title in the text field
  const titleRequirments = (e) => {
    if (!isTyping) return;

    if (
      titleContainerRef.current &&
      !titleContainerRef.current.contains(e.target)
    ) {
      //   console.log(value);
      setOutSideClick(true);
      if (form.title === "") {
        setAlert("Please fill out this field");
      } else if (wordCount < 6) {
        setAlert("Atleast 6 characters ");
      } else {
        setAlert(" ");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", titleRequirments);

    return () => {
      document.removeEventListener("click", titleRequirments);
    };
  }, [form.title, wordCount, isTyping]);

  // calculate word count to limit the number of word can be written in the text field
  useEffect(() => {
    const words = form.title.length;
    setWordCount(words);
    if (form.title) {
      // console.log(form.title);
      setIsTyping(true);
      if (wordCount >= 6) {
        setTitleReq(true);
      } else {
        setTitleReq(false);
      }
    }
  }, [form.title, wordCount]);

  return (
    <div className="mb-3">
      <div
        onClick={focusTextArea}
        ref={titleContainerRef}
        className={`${title} ${
          alert.trim() === ""
            ? ""
            : outSideClick
            ? "outline outline-2 outline-red-500"
            : ""
        } hover:border-gray-400 hover:bg-neutral-800`}
      >
        <div className="w-full relative py-2 flex items-end">
          <textarea
            ref={titleRef}
            value={form.title}
            onChange={handleChange}
            id="Title"
            className={titleInput}
            placeholder=" "
          ></textarea>
          <label htmlFor="Title" className={`${titleLabel}`}>
            Title
          </label>
        </div>
        {outSideClick ? (
          <span
            className={`ml-3 ${
              alert.trim() === "" ? "hidden" : "text-red-500"
            }`}
          >
            <GrCircleAlert size={20} />
          </span>
        ) : null}

        {outSideClick && wordCount >= 6 && (
          <span className="ml-3 text-green-500">
            <FaCheck size={20} />
          </span>
        )}
      </div>
      <div className="flex justify-between px-4 text-xs">
        <span className={`${alert.trim() === "" ? "" : "text-red-500"}`}>
          {alert}
        </span>
        <span>{wordCount}/300</span>
      </div>
    </div>
  );
};

export default TitleInput;
