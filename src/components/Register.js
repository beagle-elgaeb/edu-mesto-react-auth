import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import * as auth from "../utils/Auth.js";

function Register({ history, showResult }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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
        <input
          id="register-input"
          className="register__input"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          required />
        <input
          id="register-input"
          className="register__input"
          type="text"
          {...formik.getFieldProps("password")}
          placeholder="Пароль"
          required />
        <button className="register__button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
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