import React from "react";
import { Link } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Login.css';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isClickedEmail, setClickedEmail] = React.useState(false);
    const [isClickedPassword, setClickedPassword] = React.useState(false);
    const [isFetching, toggleIsFetching] = React.useState(false);

    const [emailError, setEmailError] = React.useState("Поле Email не может быть пустым");
    const [passwordError, setPasswordError] = React.useState("Поле с паролем не может быть пустым");

    const [formValid, setFormValid] = React.useState(false);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setClickedEmail(true)
                break
            case 'password':
                setClickedPassword(true)
                break

            // no default
        }
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
        const schemaEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!schemaEmail.test(String(e.target.value).toLowerCase())) {
            setEmailError("Некорректный email");
            if (!e.target.value) {
                setEmailError("Поле Email не может быть пустым")
            }
        }   else {
                setEmailError("")
            }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (!e.target.value) {
            setPasswordError("Поле с паролем не может быть пустым")
        } else {
            setPasswordError("")
        }
    }

    React.useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const handleSubmit = (e) => {
        toggleIsFetching(true);
        e.preventDefault();
        if (!email || !password){
            return;
          }
        props.handleLogin(email, password);
      }

    return (
        <div className="login">
            <h2 className="login__title">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <p className="login__data-name">Email</p>
                <input onBlur={e => blurHandler(e)} className="login__data" id="form-email" name="email" value={email} onChange={e => emailChange(e)} required type="email" />
                {(isClickedEmail && emailError) && <span className="login__data-error">{emailError}</span>}
                <p className="login__data-name">Пароль</p>
                <input onBlur={e => blurHandler(e)} className="login__data" id="form-job" name="password" required type="password" value={password} onChange={e => passwordHandler(e)} />
                {(passwordError && isClickedPassword) && <span className="login__data-error">{passwordError}</span>}
                {isFetching ? <Preloader isFetching={isFetching} /> : <button disabled={!formValid} type="submit" className={`login__submit ${formValid ? "login__submit_valid" : "login__submit_invalid"}`}>Войти</button>}
            </form>
            <div className="login__register">
            <p className="login__register-title">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__register-link">Регистрация</Link>
            </div>
        </div>
    )
}

export default Login;