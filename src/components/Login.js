import React from "react";
import { withRouter } from "react-router-dom";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import loader from "../images/loader.gif";

function Login({ isLogined, authorization }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      authorization({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" name="login" onSubmit={formik.handleSubmit}>
        <fieldset className="login__fieldset">
          <input
            id="login-input-email"
            className="login__input"
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
            required
          />
          <input
            id="login-input-pass"
            className="login__input"
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Пароль"
            required
          />
        </fieldset>

        {isLogined && (
          <div className="login__loadbar">
            <img
              className="login__loadbar-img"
              src={loader}
              alt="Вход"
            />
          </div>
        )}

        <button className="login__button" type="submit" aria-label="Войти">
          Войти
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  isLogined: PropTypes.bool.isRequired,
  authorization: PropTypes.func.isRequired,
};

export default withRouter(Login);
