export const handleOverlayClick = (e, setIsModalOpen) => {
  if (e.target.classList.contains("overlay")) {
    setIsModalOpen(false);
  }
};
