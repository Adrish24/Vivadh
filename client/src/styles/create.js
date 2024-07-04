const submit =
  "w-[700px] h-[600px] m-auto rounded-3xl p-5 bg-neutral-900 text-neutral-100 overflow-y-auto scroll-smooth";

// title input
const title =
  "border border-gray-500 border-opacity-50 rounded-2xl pt-3 pb-2 px-4 mb-1.5 flex items-center";
const titleInput =
  "w-full h-5 text-sm focus:outline-none  focus:ring-0 appearance-none resize-none overflow-hidden bg-transparent peer";
const titleLabel =
  "absolute duration-150 transform -translate-y-3 scale-75  z-10 origin-[0] top-0 left-0 text-neutral-400 after:content-['*'] after:ml-0.5 after:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text";

// body input
const body =
  "border border-gray-500 border-opacity-50 rounded-2xl flex items-center relative  mb-1.5";

const bodyTextArea =
  "w-full h-full min-h-28 px-4 py-3 bg-transparent overflow-hidden rounded-2xl outline-none box-border focus:border focus:border-neutral-400";

const bodyLabel =
  "absolute top-3 left-4 after:content-['*'] after:ml-0.5 after:text-red-500 text-neutral-400 cursor-text";

const upload = " w-full min-h-40 border  rounded-3xl flex overflow-hidden"

const uploadBtn = "p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full ml-2 cursor-pointer"



export { submit, title, titleInput, titleLabel, body, bodyTextArea, bodyLabel, upload, uploadBtn };
