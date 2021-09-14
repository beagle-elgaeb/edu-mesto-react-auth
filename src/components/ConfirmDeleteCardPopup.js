import React from "react";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup({ card, onDelete, isOpen, onClose }) {
  function handleSubmit() {
    onDelete(card).then(() => {
      onClose();
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Вы уверены?"
      buttonText="Да"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

ConfirmDeleteCardPopup.propTypes = {
  card: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmDeleteCardPopup;
