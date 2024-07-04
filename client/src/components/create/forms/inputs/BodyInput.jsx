/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { body, bodyLabel, bodyTextArea } from "../../../../styles/create";

const BodyInput = ({isTyping, setIsTyping, form, setForm}) => {
  const [alert, setAlert] = useState("");
  const [outSideClick, setOutSideClick] = useState(false);

  const bodyRef = useRef(null);

  const focusTexatArea = () => {
    if (bodyRef.current) {
      bodyRef.current.focus();
      setOutSideClick(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, body: e.target.value });

    if (bodyRef.current) {
      bodyRef.current.style.height = "112px";
      bodyRef.current.style.height = `${bodyRef.current.scrollHeight}px`;
    }
  };

  // reflecting requirments for the body in the text field
  const titleRequirments = (e) => {
    if (!isTyping) return;

    if (bodyRef.current && !bodyRef.current.contains(e.target)) {
      //   console.log(value);
      setOutSideClick(true);
      if (form.body === "") {
        setAlert("The field is required");
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
      setIsTyping(true);
    }
  }, [form.body]);

  return (
    <div>
      <div
        className={`
        ${body}
        ${
          alert.trim() === ""
            ? ""
            : outSideClick
            ? "outline outline-2 outline-red-500"
            : ""
        }
        `}
      >
        <textarea
          ref={bodyRef}
          onChange={handleChange}
          value={form.body}
          className={bodyTextArea}
        ></textarea>
        {form.body.length === 0 && (
          <label onClick={focusTexatArea} htmlFor="body" className={bodyLabel}>
            Body
          </label>
        )}
      </div>
      <div className="px-4 text-xs">
        <span className={`${alert.trim() === "" ? "" : "text-red-500"}`}>
          {alert}
        </span>
      </div>
    </div>
  );
};

export default BodyInput;
