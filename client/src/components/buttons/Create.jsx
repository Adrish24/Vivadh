/* eslint-disable react/prop-types */

import { HiPlus } from "react-icons/hi2";

const Create = ({setIsCreate}) => {

  const handleCreate = () => {
     setIsCreate(true);
  };
  
  return (
    <button
        onClick={handleCreate}
        className="fixed bottom-[20px] right-[40px]
        flex justify-center
        items-center 
        p-2 rounded-3xl bg-neutral-800 hover:bg-slate-700
        "
        title="Create"
      >
        <span>
          <HiPlus size={32} color="white"/>
        </span>
      </button>
  );
};

export default Create;
