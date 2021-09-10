import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import * as auth from "../utils/Auth.js";

function Register({ history, showResult }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Введите, пожулуйста, корректный email")
        .required("Введите, пожалуйста, email"),
      password: Yup.string()
        .min(8, "Пароль не должно быть короче 8 символов")
        .matches(/^[a-zA-Z0-9]/, "Пароль может сожержать только латинские символы")
        .matches(/^(?=.*[A-Z])/, "Пароль должен содердать хотябы один символ верхнего регистра")
        .matches(/^(?=.*[a-z])/, "Пароль должен содердать хотябы один символ нижнего регистра")
        .matches(/^(?=.*[0-9])/, "Пароль должен содердать хотябы одну цифру")
        .required("Введите, пожалуйста, пароль"),
    }),
    onSubmit: (values) => {
      auth.register({
        email: values.email,
        password: values.password,
      })
        .then(() => {
          showResult(true);
          history.push("/sign-in");
        })
        .catch(() => {
          showResult(false);
        });

    },
  });

  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" name="register" onSubmit={formik.handleSubmit}>
        <fieldset className="login__fieldset">
          <input
            id="register-input"
            className="register__input"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email" />
          <span className="register__error">
            {formik.touched.email && formik.errors.email ? formik.errors.email : null}
          </span>
          <input
            id="register-input"
            className="register__input"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Пароль" />
          <span className="register__error">
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
          </span>
        </fieldset>

        <button
          className={`register__button ${!formik.isValid ? "register__button_disabled" : ""}`}
          type="submit"
          aria-label="Зарегистрироваться"
          disabled={!formik.isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="register__question">Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link></p>
    </section>
  )
}

Register.propTypes = {
  history: PropTypes.object.isRequired,
  showResult: PropTypes.func.isRequired,
}

export default withRouter(Register);