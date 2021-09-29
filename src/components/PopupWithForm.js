import React from "react";
import PropTypes from "prop-types";

import * as StyleForm from "../styles/StylesForm";
import * as StylePopup from "../styles/StylesPopup";

import buttonClosePopup from "../images/button-сlose.svg";

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  disabledSubmit,
  onSubmit,
  onClose,
  onKeydown,
}) {
  const [isSubmit, setIsSubmit] = React.useState(false);

  React.useEffect(() => {
    setIsSubmit(false);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit();
    setIsSubmit(true);
  }

  return (
    <StylePopup.Overlay opened={isOpen} onClick={onClose}>
      <StylePopup.Container onClick={(e) => e.stopPropagation()}>
        <StyleForm.Title>{title}</StyleForm.Title>
        <StyleForm.Form onSubmit={handleSubmit}>
          {children}
          <StyleForm.SubmitButton type="submit" aria-label="Сохранить" disabled={disabledSubmit}>
            {buttonText}
            {isSubmit ? "..." : ""}
          </StyleForm.SubmitButton>
        </StyleForm.Form>
        <StylePopup.CloseButton type="button" aria-label="Закрыть окно" onClick={onClose}>
          <StylePopup.CloseButtonIcon src={buttonClosePopup} alt="Закрыть окно" />
        </StylePopup.CloseButton>
      </StylePopup.Container>
    </StylePopup.Overlay>
  );
}

PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  disabledSubmit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func,
};

export default PopupWithForm;
