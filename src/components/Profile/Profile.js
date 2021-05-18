import React from "react";
import "./Profile.css";

export default function Profile() {

    return (
        <div className="profile">
            <h2 className="profile__title">Привет, Анастасия!</h2>
            <div className="profile__container">
                <h3 className="profile__name">Имя</h3>
                <p className="profile__data">Анастасия</p>
            </div>
            <div className="profile__line" />
            <div className="profile__container">
                <h3 className="profile__name">Email</h3>
                <p className="profile__data">email@yandex.ru</p>
            </div>
            <button className="profile__edit-button">Редактировать</button>
            <button className="profile__exit-button">Выйти из аккаунта</button>
        </div>
    )
}