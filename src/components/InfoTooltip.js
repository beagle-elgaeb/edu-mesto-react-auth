import buttonClosePopup from "../images/button-сlose.svg";
import imageOk from "../images/icon-ok.svg";
import imageErr from "../images/icon-err.svg";
import PropTypes from "prop-types";

function InfoTooltip({ success, isOpen, onClose }) {

  return (
    <div className={`popup popup_type_tooltype ${isOpen ? "popup_opened" : ""} `} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <img className="popup__icon" src={success ? imageOk : imageErr} alt={success ? "ОК" : "Ошибка"} />
        <p className="popup__text">{success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button className="popup__button-close" type="button" aria-label="Закрыть окно" onClick={onClose}>
          <img className="popup__button-close-img" src={buttonClosePopup} alt="Закрыть окно" />
        </button>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  success: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default InfoTooltip;
