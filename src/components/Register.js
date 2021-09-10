import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import * as auth from "../utils/Auth.js";

import eyeOpen from "../images/icon-eye-open.svg"
import eyeClose from "../images/icon-eye-close.svg";

function Register({ history, showResult }) {
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
        .min(8, "Пароль не должно быть короче 8 символов")
        .matches(/^[a-zA-Z0-9]/, "Пароль может сожержать только латинские символы")
        .matches(/^(?=.*[A-Z])/, "Пароль должен содердать хотябы один символ верхнего регистра")
        .matches(/^(?=.*[a-z])/, "Пароль должен содердать хотябы один символ нижнего регистра")
        .matches(/^(?=.*[0-9])/, "Пароль должен содердать хотябы одну цифру")
        .required("Введите, пожалуйста, пароль"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
        .required("Введите пароль повторно, пожалуйста"),
    }),
    onSubmit: (values) => {
      if (values.password === values.confirmPassword) {
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
      }
    },
  });

  const [visiblePass, setVisibilityPass] = React.useState(false);
  const [visibleConfirmPass, setVisibilityConfirmPass] = React.useState(false);

  function changeButtonPass() {
    setVisibilityPass(state => !state);
  }

  function changeButtonConfirmPass() {
    setVisibilityConfirmPass(state => !state);
  }

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
          <div className="register__pass-input">
            <input
              id="register-input"
              className="register__input"
              type={!visiblePass ? "password" : "text"}
              {...formik.getFieldProps("password")}
              placeholder="Пароль" />
            <button className="register__eye" onClick={changeButtonPass}>
              <img src={!visiblePass ? eyeClose : eyeOpen} alt={!visiblePass ? "Пароль скрыт" : "Пароль показан"} />
            </button>
          </div>
          <span className="register__error">
            {formik.touched.password && formik.errors.password ? formik.errors.password : null}
          </span>
          <div className="register__pass-input">
            <input
              id="register-input"
              className="register__input"
              type={!visibleConfirmPass ? "password" : "text"}
              {...formik.getFieldProps("confirmPassword")}
              placeholder="Повторите пароль" />
            <button className="register__eye" onClick={changeButtonConfirmPass}>
              <img src={!visibleConfirmPass ? eyeClose : eyeOpen} alt={!visibleConfirmPass ? "Пароль скрыт" : "Пароль показан"} />
            </button>
          </div>
          <span className="register__error">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
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