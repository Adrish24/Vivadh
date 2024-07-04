/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { GrCircleAlert } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import { title, titleInput, titleLabel } from "../../../../styles/create";



const LinkInput = ({ isTyping, setIsTyping, form, setForm }) => {
  const [alert, setAlert] = useState("");

  const [isUrl, setIsurl] = useState(false);
  const [outSideClick, setOutSideClick] = useState(false);

  const linkRef = useRef(null);
  const linkContainerRef = useRef(null);

  // focus text field
  const focusTextArea = () => {
    if (linkRef.current) {
      linkRef.current.focus();
      setOutSideClick(false);
    }
  };
 
//   validats link url
  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // reflecting user input in the text field
  const handleChange = (e) => {
    setForm({ ...form, body: e.target.value });
    setIsurl(validateUrl(e.target.value));

    if (linkRef.current) {
      linkRef.current.style.height = "20px";
      linkRef.current.style.height = `${linkRef.current.scrollHeight}px`;
    }
  };

  // reflecting requirments for the link in the text field
  const titleRequirments = (e) => {
    if (!isTyping) return;

    if (
      linkContainerRef.current &&
      !linkContainerRef.current.contains(e.target)
    ) {
      //   console.log(value);
      setOutSideClick(true);
      if (form.body === "") {
        setAlert("Please fill out this field");
      } else if (!isUrl) {
        setAlert("This is not a link");
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
  }, [form.body, isTyping]);

  useEffect(() => {
    if (form.body) {
      console.log(isUrl);
      setIsTyping(true);
    }
  }, [form.body]);

  return (
    <div className="mb-3">
      <div
        onClick={focusTextArea}
        ref={linkContainerRef}
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
            ref={linkRef}
            value={form.body}
            onChange={handleChange}
            id="Link"
            className={titleInput}
            placeholder=" "
          ></textarea>
          <label htmlFor="Link" className={`${titleLabel}`}>
            Link Url
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

        {outSideClick && isUrl && (
          <span className="ml-3 text-green-500">
            <FaCheck size={20} />
          </span>
        )}
      </div>
      <div className=" px-4 text-xs">
        <span className={`${alert.trim() === "" ? "" : "text-red-500"}`}>
          {alert}
        </span>
      </div>
    </div>
  );
};

export default LinkInput;
