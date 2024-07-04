/* eslint-disable react/prop-types */
import { GrClose } from "react-icons/gr";
import SearchBar from "../navs/SearchBar";
import { useState } from "react";

const flairs = [
  { flair: "Discussion", color: "#4B0082" },
  { flair: "Opinion", color: "#FF4500" },
  { flair: "Question", color: "#4682B4" },
  { flair: "Feedback/Suggestion", color: "#32CD32" },
  { flair: "Image", color: "#FFD700" },
  { flair: "Video", color: "#FF6347" },
];

const Flair = ({ form, setForm, setShow }) => {
  const [choice, setChoice] = useState({
    name: "",
    color: "",
  });

  const handleChoice = (flair, color) => {
    // console.log(flair, color);
    setChoice({ ...choice, name: flair, color: color });
  };

  const handleAdd = async () => {
    setForm({ ...form, flair: choice });
    setShow(false);
  };

  return (
    <div className="w-[500px]  m-auto bg-neutral-950 border border-neutral-800 p-5 rounded-3xl">
      <div className="flex justify-between">
        <h2 className="text-[24px] font-bold">Add flair</h2>
        <button
          onClick={() => setShow(false)}
          className="bg-neutral-900 hover:bg-neutral-800 p-3 rounded-full"
        >
          <GrClose size={16} />
        </button>
      </div>

      <div className="after:content-['*'] after:ml-0.5 after:text-red-500 my-2">
        flair
      </div>
      <SearchBar />
      <div className="flex flex-col mt-2 h-80 overflow-y-auto">
        {flairs.map((flair) => (
          <div
            className={`
                flex items-center 
                cursor-pointer 
                mb-4
                `}
            key={flair.flair}
            onClick={() => handleChoice(flair.flair, flair.color)}
          >
            <div className="w-4 h-4 mr-4 rounded-full border-2 border-neutral-300 flex items-center justify-center">
              {choice.name === flair.flair && (
                <div className="w-2 h-2 rounded-full bg-neutral-300" />
              )}
            </div>
            <a
              className="px-3 py-1.5 uppercase text-sm font-word font-semibold rounded-3xl text-black"
              style={{ backgroundColor: flair.color }}
            >
              {flair.flair}
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleAdd}
          disabled={choice.name.length === 0 ? true : false}
          className={`px-4 py-2 rounded-3xl ${
            choice.name
              ? "bg-blue-600 hover:bg-blue-500 "
              : "bg-neutral-800 text-neutral-500"
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Flair;
