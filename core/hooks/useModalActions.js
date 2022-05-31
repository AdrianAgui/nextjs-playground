import { useRef, useState } from 'react';
import useOutsideClick from './useOutsideClick';

export default function useModalActions(setOpenModal) {
  const [closing, setClosing] = useState(false);

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setOpenModal(false);
    }, 400);
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, closeModal);

  return { wrapperRef, closing, closeModal };
}
