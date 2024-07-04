/* eslint-disable react/prop-types */
import { GrClose } from "react-icons/gr";
import SearchBar from "../navs/SearchBar";
import { useState } from "react";

const topics = [
  { topic: "technology", color: "#3498db" }, // Blue
  { topic: "travel", color: "#e74c3c" }, // Red
  { topic: "food", color: "#f39c12" }, // Orange
  { topic: "sports", color: "#2ecc71" }, // Green
  { topic: "fashion", color: "#9b59b6" }, // Purple
  { topic: "music", color: "#e67e22" }, // Orange
  { topic: "movies", color: "#1abc9c" }, // Turquoise
  { topic: "fitness", color: "#1840ad" }, // Navy blue
  { topic: "books", color: "#34495e" }, // Dark Blue
  { topic: "art", color: "#f1c40f" }, // Yellow
];

const Topics = ({ form, setForm, setShow }) => {
  const [choice, setChoice] = useState({
    name: "",
    color: "",
  });

  const handleChoice = (topic, color) => {
    // console.log(topic, color);
    setChoice({ ...choice, name: topic, color: color });
  };

  const handleAdd = async () => {
    setForm({ ...form, topic: choice });
    setShow(false);
  };

  return (
    <div
      className="w-[500px]  m-auto bg-neutral-950 border border-neutral-800 p-5 rounded-3xl"
    >
      <div className="flex justify-between">
        <h2 className="text-[24px] font-bold">Add Topic</h2>
        <button 
          onClick={() => setShow(false)}
          className="bg-neutral-900 hover:bg-neutral-800 p-3 rounded-full">
          <GrClose size={16} />
        </button>
      </div>

      <div className="after:content-['*'] after:ml-0.5 after:text-red-500 my-2">
        Topic
      </div>
      <SearchBar />
      <div className="flex flex-col mt-2 h-80 overflow-y-auto">
        {topics.map((topic) => (
          <div
            className={`
            flex items-center 
            cursor-pointer 
            mb-4
            `}
            key={topic.topic}
            onClick={() => handleChoice(topic.topic, topic.color)}
          >
            <div className="w-4 h-4 mr-4 rounded-full border-2 border-neutral-300 flex items-center justify-center">
              {choice.name === topic.topic && (
                <div className="w-2 h-2 rounded-full bg-neutral-300" />
              )}
            </div>
            <a
              className="px-3 py-1.5 uppercase text-sm font-word font-semibold rounded-3xl text-black"
              style={{ backgroundColor: topic.color }}
            >
              {topic.topic}
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

export default Topics;
