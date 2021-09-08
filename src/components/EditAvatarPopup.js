import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const formik = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: Yup.object({
      avatar: Yup.string()
        .url("Введите, пожалуйста, корректную ссылку")
        .required("Введите, пожалуйста, ссылку на изображение"),
    }),
    onSubmit: (values) => {
      onUpdateAvatar({
        avatar: values.avatar,
      });
    },
  });

  React.useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={formik.handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      disabledSubmit={!formik.isValid}
    >
      <fieldset className="popup__fieldset">
        <input
          id="url-avatar-input"
          className="popup__input"
          type="url"
          {...formik.getFieldProps("avatar")}
          placeholder="Ссылка на аватар"
          required />
        <span className="popup__error">
          {formik.touched.avatar && formik.errors.avatar ? formik.errors.avatar : null}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  onUpdateAvatar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditAvatarPopup;
