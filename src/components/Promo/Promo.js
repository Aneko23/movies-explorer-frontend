import React from "react";
import PromoLogo from "../../images/background.png";
import "./Promo.css";

export default function Promo() {

    return(
        <div className="promo">
            <h1 className="promo-title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className="promo-logo" src={PromoLogo} alt="Логотип Я.Практикума в дипломной работе" />
        </div>
    )
}