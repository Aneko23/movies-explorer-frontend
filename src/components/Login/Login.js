import React from "react";
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = ({ handleLogin }) => {

    const [data, setData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        const { email, password } = data;
        e.preventDefault();
        if (!email || !password){
            return;
          }

        handleLogin(email, password);
      }

    return (
        <div className="login">
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <p className="login__data-name">Email</p>
                <input className="login__data" id="form-email" name="email" value={data.email} onChange={handleChange} required type="email" />
                <span className= "login__input-error" id='form-email-error' />
                <p className="login__data-name">Пароль</p>
                <input className="login__data" id="form-job" name="password" required type="password" value={data.password} onChange={handleChange} />
                <span className= "login__input-error" id='form-job-error' />
                <button type="submit" className="login__submit">Войти</button>
            </form>
            <div className="login__register">
            <p className="login__register-title">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__register-link">Регистрация</Link>
            </div>
        </div>

    )
}

export default Login;