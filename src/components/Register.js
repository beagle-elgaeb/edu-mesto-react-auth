import React from "react";
import { useFormik } from "formik";

import * as auth from "../utils/Auth.js";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Register() {
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
      <p className="register__question">Уже зарешистрирвоаны? <Link className="register__link">Войти</Link></p>
    </section>
  )
}

export default Register;