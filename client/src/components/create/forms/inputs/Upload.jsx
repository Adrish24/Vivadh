/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

import Preview from "../../../preview/Preview";
import Modal from "../../../modal/Modal";
import DeleteItem from "../../../preview/DeleteItem";
import { upload, uploadBtn } from "../../../../styles/create";

import axios from "axios";
import delay from "../../../../utls/delay";

const Upload = ({
  isTyping,
  setIsTyping,
  form,
  setForm,
  fileType,
  setFileType,
}) => {
  const [alert, setAlert] = useState("");

  const [dragActive, setDragActive] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const bodyRef = useRef(null);

  const noInput = form.body?.length === 0;

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  //   handling file drop
  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;

    // checking for file type and upload files
    if (files && files[0] && files[0].type.split("/")[0] === "image") {
      await handleImageUpload(files);
      e.target.files = null;
    }

    // handling video selection
    if (files && files[0] && files[0].type.split("/")[0] === "video") {
      await handleVideoUpload(files);
      e.target.files = null;
    }
  };

  //   handling file selection from on click file select
  const handleChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.target.files;

    // checking for file type then upload files
    if (files && files[0] && files[0].type.split("/")[0] === "image") {
      await handleImageUpload(files);
      e.target.files = null;
    }

    // handling video selection
    if (files && files[0] && files[0].type.split("/")[0] === "video") {
      await handleVideoUpload(files);
      e.target.files = null;
    }
  };

  // handle video upload
  const handleVideoUpload = async (files) => {
    setFileType("video");
    if (files.length + form.body?.length > 1) {
      console.log("cannot upload more than 1 videos");
    } else {
      setLoading(true);
      console.log(files[0]);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]); // Ensure field name is 'files'
      }
      try {
        const res = await axios.post(
          "http://localhost:5000/upload/?type=video",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.data.success) {
          console.log(res.data.data);
          setForm({ ...form, body: res.data.data });
        }
        await delay(1000);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  // handling image uploads
  const handleImageUpload = async (files) => {
    setFileType("image");
    if (files.length + form.body?.length > 5) {
      console.log("cannot upload more than 5 images");
    } else {
      setLoading(true);

      console.log(files);

      // Create a FormData object to hold the files
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]); // Ensure field name is 'files'
      }
      try {
        const res = await axios.post(
          "http://localhost:5000/upload/?type=image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.data.success) {
          console.log(res.data.data);
          setForm({ ...form, body: res.data.data });
        }
        await delay(1000);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  // handling file selection on click
  const selectFiles = () => {
    fileInputRef.current.click();
  };

  // delete single item if its only existing file in the gallery
  // show delete tab on click
  const handleDelete = async (publicId) => {
    if (form.body.length === 1) {
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
          setForm({ ...form, body: [] });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setShowDelete(true);
    }
  };

  // close delete tab on click
  const handleClose = () => {
    setShowDelete(false);
  };

  // reflecting requirments for file upload
  const titleRequirments = (e) => {
    if (!isTyping) return;

    if (bodyRef.current && !bodyRef.current.contains(e.target)) {
      if (noInput) {
        setAlert("Please add a media file");
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
  }, [form.body]);

  useEffect(() => {
    if (!noInput) {
      // console.log(form.title);
      setIsTyping(true);
    }
  }, [form.body]);

  return (
    <div>
      <div
        ref={bodyRef}
        className={`
        ${upload}
   
    ${
      dragActive
        ? "border-red-500 bg-neutral-950"
        : form.body.length > 0
        ? "border-neutral-400"
        : "border-neutral-600 border-dashed border-2"
    }
    `}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          onChange={handleChange}
          type="file"
          accept="image/*, video/*"
          multiple
          className="hidden"
        />

        {loading ? (
          <span className="m-auto animate-spin">
            <VscLoading size={24} />
          </span>
        ) : form.body.length === 0 ? (
          <>
            {dragActive ? (
              <div className="m-auto flex items-center text-sm">
                <span>Drop here to upload</span>
                <a className={uploadBtn}>
                  <AiOutlineCloudUpload size={16} />
                </a>
              </div>
            ) : (
              <div className="m-auto flex items-center text-sm">
                <span>Drag and Drop images or videos or</span>
                <a onClick={selectFiles} className={uploadBtn}>
                  <AiOutlineCloudUpload size={16} />
                </a>
              </div>
            )}
          </>
        ) : (
          <Preview
            type={fileType}
            form={form}
            selectFiles={selectFiles}
            handleDelete={() => handleDelete(form.body?.[0]?.public_id)}
          />
        )}
      </div>
      <div className="px-4 text-xs">
        <span className={`${alert.trim() === "" ? "" : "text-red-500"}`}>
          {alert}
        </span>
      </div>
      {showDelete && (
        <Modal
          Component={DeleteItem}
          componentProps={{ form, setForm, handleClose, fileType }}
        />
      )}
    </div>
  );
};

export default Upload;
