import React, { ReactNode, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from 'actions/modal';
import { useOnClickOutside } from 'utils/hooks';

const ModalWrapper = ({ children, dontClickOutside }: { children?: ReactNode; dontClickOutside?: boolean }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    if (!dontClickOutside) {
      dispatch(closeModal());
    }
  });

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute w-full h-full bg-black opacity-75 "></div>
      <div
        ref={modalRef}
        className="modal-container mx-auto relative w-11/12 sm:w-4/5 md:max-w-lg animated zoomIn animate300"
      >
        <div className="bg-white rounded-lg shadow z-50 overflow-y-auto customMaxHeight">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default ModalWrapper;
