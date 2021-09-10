import React from "react";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import * as auth from "../utils/Auth.js";

function Login({ handleLogin, showResult, history }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      auth.authorize({
        email: values.email,
        password: values.password,
      })
        .then((token) => {
          if (token) {
            localStorage.setItem("token", token);
            handleLogin(token);
            history.push("/content");
          }
        })
        .catch(() => {
          showResult(false);
        });
    },
  });

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" name="login" onSubmit={formik.handleSubmit}>
        <fieldset className="login__fieldset">
          <input
            id="login-input"
            className="login__input"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            required />
          <input
            id="login-input"
            className="login__input"
            type="text"
            {...formik.getFieldProps("password")}
            placeholder="Пароль"
            required />
        </fieldset>
        <button className="login__button" type="submit" aria-label="Войти">Войти</button>
      </form>
    </section>

  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  showResult: PropTypes.func.isRequired,
}

export default withRouter(Login);