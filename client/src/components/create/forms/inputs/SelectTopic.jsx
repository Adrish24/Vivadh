/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../../modal/Modal";
import Topics from "../../Topics";
import { FiEdit } from "react-icons/fi";

const SelectTopic = ({ form, setForm }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="flex items-center mb-4">
      {form.topic?.name && (
        <a
          className="px-3 py-1.5 mr-2 uppercase text-sm font-word font-semibold rounded-3xl text-black"
          style={{ backgroundColor: form.topic?.color }}
        >
          {form.topic?.name}
        </a>
      )}
      {form.topic?.name ? (
        <div
          onClick={handleShow}
          className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-full cursor-pointer"
        >
          <FiEdit size={12} />
        </div>
      ) : (
        <div
          onClick={handleShow}
          className="
        bg-neutral-800 hover:bg-neutral-700
        py-2 px-3 text-xs 
        rounded-full 
        after:content-['*'] after:ml-0.5 
        after:text-red-500 
        cursor-pointer
        "
        >
          Add topic
        </div>
      )}

      {show && (
        <Modal
          setShow={setShow}
          Component={Topics}
          componentProps={{ form, setForm, setShow }}
        />
      )}
    </div>
  );
};

export default SelectTopic;
