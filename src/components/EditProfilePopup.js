import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import PopupWithForm from "./PopupWithForm";

import * as Style from "../styles/StylesForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose, onKeydown }) {
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
      onKeydown={onKeydown}
      disabledSubmit={!formik.isValid}
    >
      <Style.Fieldset>
        <Style.Input
          id="name-input"
          error={!formik.errors.fullName}
          type="text"
          {...formik.getFieldProps("fullName")}
          placeholder="Ваше имя"
        />
        <Style.Error>
          {formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : null}
        </Style.Error>

        <Style.Input
          id="about-you-input"
          error={!formik.errors.profession}
          type="text"
          {...formik.getFieldProps("profession")}
          placeholder="Ваша профессия"
        />
        <Style.Error>
          {formik.touched.profession && formik.errors.profession ? formik.errors.profession : null}
        </Style.Error>
      </Style.Fieldset>
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  onUpdateUser: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onKeydown: PropTypes.func.isRequired,
};

export default EditProfilePopup;
