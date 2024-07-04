/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteItem = ({ form, setForm, handleClose, fileType }) => {
  const [tempArray, setTempArray] = useState(null);
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteImageOnClick = async (e, publicId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/upload/delete/?type=${fileType}`,
        { public_id: publicId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        const newArray = tempArray.filter((b) => b.public_id !== publicId);
        setTempArray(newArray);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAll = async (e) => {
    e.preventDefault();
    const publicIds = tempArray.map((item) => item.public_id);
    try {
      const res = await axios.post(
        "http://localhost:5000/upload/deleteAll",
        { public_ids: publicIds },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        setTempArray([]);
      }
    } catch (error) {
      console.log(error);
    }

    setSave(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setForm({ ...form, body: tempArray });
    setSave(false);
    handleClose();
  };

  useEffect(() => {
    // console.log(tempArray?.length);
    if (tempArray?.length === 0 || tempArray?.length < form.body.length) {
      setSave(true);
    }
  }, [tempArray]);

  useEffect(() => {
    setTempArray(form.body);
  }, [form.body]);

  return (
    <div className="w-[500px] m-auto bg-neutral-800 p-5  rounded-3xl">
      <div className="flex justify-between">
        <h1 className="text-[24px] font-bold">Delete gallery</h1>
        <button
          onClick={handleClose}
          className="bg-neutral-700 hover:bg-neutral-600 p-3 rounded-full"
        >
          <GrClose size={16} />
        </button>
      </div>
      <div className="flex flex-col my-5 h-80 overflow-y-auto">
        {tempArray?.length > 0 ? (
          tempArray?.map((img) => (
            <div key={img.name} className="flex items-center py-2">
              <div className="flex items-center border border-neutral-500 w-12 h-12 rounded-lg overflow-hidden mr-3">
                <img
                  className=" object-cover"
                  src={img.url}
                  alt="failed to load"
                />
              </div>
              <span>{img.name}</span>
              <button
                onClick={(e) => deleteImageOnClick(e, img.public_id)}
                disabled={loading ? true : false}
                className="ml-auto p-2 rounded-full text-red-600 hover:bg-neutral-900"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ))
        ) : (
          <div>The images have been deleted.</div>
        )}
      </div>
      <div className="flex justify-end mt-4 text-sm">
        <button
          onClick={deleteAll}
          className="px-3 py-1.5 mr-2 bg-neutral-700 hover:bg-neutral-600 rounded-full "
        >
          Delete all
        </button>
        <button
          onClick={handleSave}
          disabled={save ? false : true}
          className={`px-3 py-1.5  ${
            save
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-neutral-700 text-neutral-500"
          } rounded-full `}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DeleteItem;
