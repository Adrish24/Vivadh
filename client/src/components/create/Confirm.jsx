/* eslint-disable react/prop-types */
const Confirm = ({ setShow, setConfirm, setForm, string }) => {
  // Discard form
  const discard = (e) => {
    e.preventDefault();
    setShow(false);
    setConfirm(false);
    if (setForm) {
      setForm("");
    }
  };

  // Cancel discard form
  const cancel = (e) => {
    e.preventDefault();
    setConfirm(false);
  };

  return (
    <div className="m-auto bg-neutral-950 border border-neutral-800 p-5 rounded-3xl">
      <h1 className="py-2">{string}</h1>
      <div className="flex justify-center gap-4 font-semibold mt-4">
        <button
          onClick={cancel}
          className="bg-neutral-900 px-10 py-2 rounded-full"
        >
          Cancel
        </button>
        <button
          onClick={discard}
          className="bg-red-600 px-10 py-2 rounded-full"
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default Confirm;
