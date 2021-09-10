import React from "react";
import PropTypes from "prop-types";

import buttonClosePopup from "../images/button-сlose.svg";

function ConfirmDeleteCardPopup({ card, isOpen, onClose, onKeydown }) {

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (



    <div class="popup popup_type_delete-card">
      <div class="popup__container">
        <h2 class="popup__title">Вы уверены?</h2>
        <form class="popup__form" name="form-add-card" novalidate>
          <button class="popup__button-delete" type="submit" aria-label="Удалить">
            Да
          </button>
        </form>
        <button className="popup__button-close" type="button" aria-label="Закрыть окно" onClick={onClose}>
          <img className="popup__button-close-img" src={buttonClosePopup} alt="Закрыть окно" />
        </button>
      </div>
    </div>


  );
}

ImagePopup.propTypes = {
  card: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
}

export default ConfirmDeleteCardPopup;
