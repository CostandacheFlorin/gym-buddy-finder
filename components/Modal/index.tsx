import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white p-6  rounded-lg shadow-lg w-full max-w-md">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <div className="mb-4">{content}</div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
