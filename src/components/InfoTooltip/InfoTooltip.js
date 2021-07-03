import React from 'react';
import './InfoTooltip.css';
import Success from '../../images/success.svg';
import Fail from '../../images/fail.svg';

export default function InfoTooltip(props) {

    function onClosePopup() {
        props.closeInfoTool();
    }

        return (
            <div className={props.isOpenInfoTool ? "popup-success_opened" : "popup-success"}>
                {props.isUpdateProfile ? 
                <form className={`popup__container popup__container_succes`} noValidate>
                <img className="popup__aut-result" src={Success} alt="Успешное обновление данных" />
                {props.isUpdateProfile && <h2 className="popup__auth-title">Данные успешно изменены!</h2>}
                <button type="button" className="close-button" onClick={onClosePopup} />
            </form> :
                <form className={`popup__container popup__container_succes`} noValidate>
                <img className="popup__aut-result" src={props.resultSuccess ? Success : Fail} alt={props.resultSuccess ? "Успешная регистрация" : "Неудачная регистрация"} />
                {props.loginError ? <h2 className="popup__auth-title">Не удалось войти в систему.</h2> : <h2 className="popup__auth-title">{props.resultSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>}
                <button type="button" className="close-button" onClick={onClosePopup} />
            </form>
                }
            </div> 
        )
}