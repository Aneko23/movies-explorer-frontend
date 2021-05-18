import React from "react";
import "./Portfolio.css";
import Arrow from "../../images/arrow.svg";

export default function Portfolio() {

    return (
        <div className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <div className="portfolio__container">
                <a href="https://github.com/Aneko23/how-to-learn" target="_blank" className="portfolio__link" rel="noreferrer" >Статичный сайт</a>
                <img className="portfolio__arrow" src={Arrow} alt="Стрелка для перехода к другим проектам" />
            </div>
            <div className="portfolio__container">
                <a href="https://aneko23.github.io/russian-travel" target="_blank" className="portfolio__link" rel="noreferrer" >Адаптивный сайт</a>
                <img className="portfolio__arrow" src={Arrow} alt="Стрелка для перехода к другим проектам" />
            </div>
            <div className="portfolio__container">
                <a href="https://mesto.aneko23.nomoredomains.icu/sign-in" target="_blank" className="portfolio__link" rel="noreferrer" >Одностраничное приложение</a>
                <img className="portfolio__arrow" src={Arrow} alt="Стрелка для перехода к другим проектам" />
            </div>
        </div>
    )
}