import React from "react";
import "./AboutMe.css";
import Me from "../../images/me.jpg";

export default function AboutMe() {

    return (
        <div className="about-me" id="#about-student">
            <h2 className="section__title">Студент</h2>
            <div className="landing__line" />
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__name">Анастасия</h3>
                    <p className="about-me__job">Начинающий разработчик, 24 года</p>
                    <p className="about-me__history">Я родилась на Кавказе, но сейчас живу в Москве. Больше 3-х лет изучаю корейский язык и интересуюсь культурой Азии. <br /> Благодаря поддержке близких я решила осуществить давнюю мечту: освоить программирование, чтобы в будущем создавать платформы, которые подарят людям не только пользу, но и радость.</p>
                    <div className="about-me__network">
                        <a href="https://vk.com/id515043115" target="_blank" className="about-me__link" rel="noreferrer">VK</a>
                        <a href="https://github.com/Aneko23" target="_blank" className="about-me__link" rel="noreferrer">Github</a>
                    </div>
                </div>
                <img className="about-me__photo" src={Me} alt="Фотография выпускника веб-факультета" />
            </div>
        </div>
    )
}