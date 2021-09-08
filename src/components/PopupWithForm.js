import React from "react";
import PropTypes from 'prop-types';

import buttonClosePopup from "../images/button-сlose.svg";

function PopupWithForm({ title, name, buttonText, children, isOpen, disabledSubmit, onSubmit, onClose }) {
  const [isSubmit, setIsSubmit] = React.useState(false);

  React.useEffect(() => {
    setIsSubmit(false);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit();
    setIsSubmit(true);
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""} `} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name} `} name={`form - ${name}`} onSubmit={handleSubmit} >
          {children}
          <button className={`popup__button-save ${disabledSubmit ? "popup__button-save_disabled" : ""}`} type="submit" aria-label="Сохранить" disabled={disabledSubmit}>
            {buttonText}{isSubmit ? "..." : ""}
          </button>
        </form>
        <button className="popup__button-close" type="button" aria-label="Закрыть окно" onClick={onClose}>
          <img className="popup__button-close-img" src={buttonClosePopup} alt="Закрыть окно" />
        </button>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  disabledSubmit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default PopupWithForm;
