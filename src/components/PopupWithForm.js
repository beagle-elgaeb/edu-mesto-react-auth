import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
    <PopupOverlay className={`popup_type_${name} ${isOpen && "opened"}`} onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <Title>{title}</Title>
        <Form
          className={`popup__form_type_${name}`}
          name={`form - ${name}`}
          onSubmit={handleSubmit}
        >
          {children}
          <SubmitButton
            className={disabledSubmit && "disabled"}
            type="submit"
            aria-label="Сохранить"
            disabled={disabledSubmit}
          >
            {buttonText}
            {isSubmit ? "..." : ""}
          </SubmitButton>
        </Form>
        <CloseButton type="button" aria-label="Закрыть окно" onClick={onClose}>
          <CloseButtonIcon src={buttonClosePopup} alt="Закрыть окно" />
        </CloseButton>
      </PopupContainer>
    </PopupOverlay>
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

const PopupOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in;
  margin: 0;
  z-index: -1;

  &.opened {
    visibility: visible;
    opacity: 1;
    z-index: 2;
  }
`;

const PopupContainer = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 10px;
  background: #ffffff;

  @media (max-width: 680px) {
    width: 282px;
  }
`;

const Title = styled.h2`
  width: 358px;
  font-size: 24px;
  line-height: 29px;
  font-weight: 900;
  color: #000000;
  margin: 34px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
    font-size: 18px;
    line-height: 22px;
    margin: 25px 0 25px 0;
  }
`;

const Form = styled.form`
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  width: 358px;
  height: 50px;
  background: #000000;
  border: none;
  border-radius: 2px;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: #ffffff;
  transition: opacity 0.5s ease-out;
  margin: 38px 0 34px 0;

  @media (max-width: 680px) {
    width: 238px;
    height: 46px;
    font-size: 14px;
    line-height: 17px;
    margin: 45px 0 25px 0;
  }

  :hover {
    opacity: 0.8;
  }

  &.disabled {
    background: #ffffff;
    opacity: 0.2;
    border: 1px solid #000000;
    color: #000000;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  background: transparent;
  border: none;
  outline: none;
  transition: opacity 0.5s ease-out;
  margin: 0;
  padding: 0;

  @media (max-width: 680px) {
    right: 0;
  }

  :hover {
    opacity: 0.6;
  }
`;

const CloseButtonIcon = styled.img`
  width: 40px;
  height: 40px;
  transform: rotate(45deg);

  @media (max-width: 680px) {
    width: 26px;
    height: 26px;
  }
`;
