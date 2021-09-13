import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import eyeOpen from "../images/icon-eye-open.svg";
import eyeClose from "../images/icon-eye-close.svg";
import loader from "../images/loader.gif";

function Register({ isRegistered, registration }) {
  const [visiblePass, setVisibilityPass] = React.useState(false);
  const [visibleConfirmPass, setVisibilityConfirmPass] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Введите, пожулуйста, корректный email")
        .required("Введите, пожалуйста, email"),
      password: Yup.string()
        .min(3, "Пароль не должно быть короче 3 символов")
        // .matches(
        //   /^[a-zA-Z0-9]/,
        //   "Пароль может сожержать только латинские символы"
        // )
        // .matches(
        //   /^(?=.*[A-Z])/,
        //   "Пароль должен содержать хотябы один символ верхнего регистра"
        // )
        // .matches(
        //   /^(?=.*[a-z])/,
        //   "Пароль должен содержать хотябы один символ нижнего регистра"
        // )
        // .matches(/^(?=.*[0-9])/, "Пароль должен содержать хотябы одну цифру")
        .required("Введите, пожалуйста, пароль"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
        .required("Введите пароль повторно, пожалуйста"),
    }),
    onSubmit: (values) => {
      registration(values);
    },
  });

  function changeButtonPass() {
    setVisibilityPass((state) => !state);
  }

  function changeButtonConfirmPass() {
    setVisibilityConfirmPass((state) => !state);
  }

  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form
        className="register__form"
        name="register"
        onSubmit={formik.handleSubmit}
      >
        <fieldset className="login__fieldset">
          <input
            id="register-input-email"
            className="register__input"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
          />
          <span className="register__error">
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null}
          </span>
          <div className="register__pass-input">
            <input
              id="register-input-pass"
              className="register__input"
              type={!visiblePass ? "password" : "text"}
              {...formik.getFieldProps("password")}
              placeholder="Пароль"
            />
            <button className="register__eye" onClick={changeButtonPass}>
              <img
                className="register__eye-img"
                src={!visiblePass ? eyeClose : eyeOpen}
                alt={!visiblePass ? "Пароль скрыт" : "Пароль показан"}
              />
            </button>
          </div>
          <span className="register__error">
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null}
          </span>
          <div className="register__pass-input">
            <input
              id="register-input-confirm-pass"
              className="register__input"
              type={!visibleConfirmPass ? "password" : "text"}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Повторите пароль"
            />
            <button className="register__eye" onClick={changeButtonConfirmPass}>
              <img
                className="register__eye-img"
                src={!visibleConfirmPass ? eyeClose : eyeOpen}
                alt={!visibleConfirmPass ? "Пароль скрыт" : "Пароль показан"}
              />
            </button>
          </div>
          <span className="register__error">
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : null}
          </span>
        </fieldset>

        {isRegistered
          &&
          <div className="register__loadbar">
            <img className="register__loadbar-img" src={loader} alt="Регистрация" />
          </div>
        }

        <button
          className={`register__button ${!formik.isValid ? "register__button_disabled" : ""
            }`}
          type="submit"
          aria-label="Зарегистрироваться"
          disabled={!formik.isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="register__question">
        Уже зарегистрированы?{" "}
        <Link className="register__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

Register.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
  registration: PropTypes.func.isRequired,
};

export default withRouter(Register);
