/* eslint-disable react/prop-types */
import { useRef } from "react";

const FormField = ({ labelName, type, name, id, value, handleChange }) => {
  const fieldRef = useRef(null);

  const handleFocus = () => {
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  };
  return (
    <div
      onClick={handleFocus}
      className=" bg-neutral-800 relative px-3 py-3 rounded-xl"
    >
      <input
        ref={fieldRef}
        className="w-full h-5 text-sm focus:outline-none focus:ring-0 bg-transparent peer"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder=""
        autoComplete="off"
        required
      />
      <label
        className="absolute duration-150 transform -translate-y-3 scale-75  z-10 origin-[0] top-3 left-3 text-sm text-neutral-400 after:content-['*'] after:ml-0.5 after:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
        htmlFor={id}
      >
        {labelName}
      </label>
    </div>
  );
};

export default FormField;
