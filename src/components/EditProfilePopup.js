import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
  const currentUser = React.useContext(CurrentUserContext);

  const formik = useFormik({
    initialValues: {
      fullName: currentUser.name,
      profession: currentUser.about,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Имя не должно быть короче 2 символов")
        .max(40, "Имя не должно превышать 40 символов")
        .required("Введите, пожалуйста, имя"),
      profession: Yup.string()
        .min(2, "Профессия не должно быть короче 2 символов")
        .max(200, "Профессия не должно превышать 200 символов")
        .required("Введите, пожалуйста, профессию"),
    }),
    onSubmit: (values) => {
      onUpdateUser({
        name: values.fullName,
        about: values.profession,
      });
    },
  });

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={formik.handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      disabledSubmit={!formik.isValid}
    >
      <fieldset className="popup__fieldset">

        <input
          id="name-input"
          className="popup__input popup__input_text_full-name"
          type="text"
          {...formik.getFieldProps("fullName")}
          placeholder="Ваше имя"
        />
        <span className="popup__error name-input-error">
          {formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : null}
        </span>

        <input
          id="about-you-input"
          className="popup__input popup__input_text_profession"
          type="text"
          {...formik.getFieldProps("profession")}
          placeholder="Ваша профессия"
          required
          minLength={2}
          maxLength={200} />
        <span className="popup__error name-input-error">
          {formik.touched.profession && formik.errors.profession ? formik.errors.profession : null}
        </span>

      </fieldset>
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditProfilePopup;
