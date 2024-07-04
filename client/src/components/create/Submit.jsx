/* eslint-disable react/prop-types */
import { useState } from "react";
import { submit } from "../../styles/create";
import TextForm from "./forms/TextForm";
import ImgForm from "./forms/ImgForm";
import LinkForm from "./forms/LinkForm";

const formTypes = ["Text", "Image & Video", "Link"];


const Submit = ({ setIsCreate}) => {
  const [selectType, setSelectType] = useState("Text");

  const handleClick = (type) => {
    setSelectType(type);
  };

  return (
    <div className={submit}>
      <div className="flex font-semibold mb-5">
        {formTypes.map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            className="mx-4 py-2"
          >
            <span>{type}</span>
            <div
              className={`h-1 mt-2 rounded-full ${
                selectType === type ? "bg-blue-500" : "bg-neutral-900"
              }`}
            />
          </button>
        ))}
      </div>
      {selectType === formTypes[0] && <TextForm setShow={setIsCreate}/>}
      {selectType === formTypes[1] && <ImgForm setShow={setIsCreate}/>}
      {selectType === formTypes[2] && <LinkForm setShow={setIsCreate}/>}
    </div>
  );
};

export default Submit;
