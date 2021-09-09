import React from "react";

function Login() {
  return (
    <main className="content">
      <section className="login">

        <h1 className="login__title">Вход</h1>

        <form className="login__form" name="login">

          <fieldset className="login__fieldset">
            <input
              id="login-input"
              className="login__input"
              type="email"
              placeholder="Email"
              required />
            <input
              id="login-input"
              className="login__input"
              type="text"
              placeholder="Пароль"
              required />
          </fieldset>
          <button className="login__button" type="submit" aria-label="Войти">Войти</button>
        </form>
      </section>
    </main>
  )
}

export default Login;