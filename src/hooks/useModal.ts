import { useState } from 'react';

export default function useModal() {
  const [isModalOpen, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title: string) => {
    setOpenModal(true);
    setModalTitle(title);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return {
    isModalOpen,
    modalTitle,
    openModal,
    closeModal,
  };
}
