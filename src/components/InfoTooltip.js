import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import buttonClosePopup from "../images/button-сlose.svg";
import imageOk from "../images/icon-ok.svg";
import imageErr from "../images/icon-err.svg";

function InfoTooltip({ success, isOpen, onClose, onKeydown }) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupOverlay opened={isOpen} onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <ToolTyipIcon src={success ? imageOk : imageErr} alt={success ? "ОК" : "Ошибка"} />
        <Text>
          {success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </Text>
        <CloseButton type="button" aria-label="Закрыть окно" onClick={onClose}>
          <CloseButtonIcon src={buttonClosePopup} alt="Закрыть окно" />
        </CloseButton>
      </PopupContainer>
    </PopupOverlay>
  );
}

InfoTooltip.propTypes = {
  success: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default InfoTooltip;

const PopupOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  overflow: hidden;
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  opacity: ${({ opened }) => (opened ? "1" : "0")};
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in;
  margin: 0;
  z-index: ${({ opened }) => (opened ? "2" : "-1")};
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

const ToolTyipIcon = styled.img`
  width: 120px;
  height: 120px;
  margin: 60px auto 32px auto;
`;

const Text = styled.p`
  width: 83%;
  height: 58px;
  font-size: 24px;
  line-height: 29px;
  font-weight: 900;
  color: #000000;
  text-align: center;
  margin: 0 auto 60px auto;

  @media (max-width: 680px) {
    width: 244px;
    font-size: 20px;
    line-height: 24px;
    margin: 0 auto 50px auto;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
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
