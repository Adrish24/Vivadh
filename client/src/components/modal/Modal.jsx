/* eslint-disable react/prop-types */

const Modal = ({ Component, componentProps }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-neutral-950 bg-opacity-50 flex">
      <Component {...componentProps} />
    </div>
  );
};

export default Modal;
