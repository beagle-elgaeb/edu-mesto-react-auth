import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {


  const formik = useFormik({
    initialValues: {
      title: "",
      pic: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Название не должно быть короче 2 символов")
        .max(30, "Название не должно превышать 30 символов")
        .required("Введите, пожалуйста, название"),
      pic: Yup.string()
        .url("Введите, пожалуйста, корректную ссылку")
        .required("Введите, пожалуйста, ссылку на изображение"),
    }),
    onSubmit: (values) => {
      onAddPlace({
        title: values.title,
        pic: values.pic,
      });
    },
  });

  React.useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      onSubmit={formik.handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      disabledSubmit={!formik.isValid}
    >
      <fieldset className="popup__fieldset">
        <input
          id="title-pic-input"
          className="popup__input"
          type="text"
          {...formik.getFieldProps("title")}
          placeholder="Название места"
        />
        <span className="popup__error">
          {formik.touched.title && formik.errors.title ? formik.errors.title : null}
        </span>


        <input
          id="url-pic-input"
          className="popup__input popup__input_url_pic"
          type="url"
          {...formik.getFieldProps("pic")}
          placeholder="Ссылка на картинку"
        />
                <span className="popup__error">
          {formik.touched.pic && formik.errors.pic ? formik.errors.pic : null}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  onAddPlace: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddPlacePopup;
