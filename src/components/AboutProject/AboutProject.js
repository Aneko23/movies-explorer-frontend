import React from "react";
import "./AboutProject.css";

export default function AboutProject() {

    return(
        <div className="about-project" id="#about-project">
            <h2 className="section__title">О проекте</h2>
            <div className="landing__line" />
            <div className="about-project__container">
                <div className="about-project__item">
                    <h3 className="about-project__sub-title">Дипломный проект включал 5 этапов</h3>
                    <article className="about-project__article">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</article>
                </div>
                <div className="about-project__item">
                    <h3 className="about-project__sub-title">На выполнение диплома ушло 5 недель</h3>
                    <article className="about-project__article">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</article>
                </div>
            </div>
            <div className="about-project__schema">
                <p className="about-project__time_green">1 неделя</p>
                <p className="about-project__time_grey">4 недели</p>
            </div>
            <div className="about-project__schema">
                <h4 className="about-project__back-end">Back-end</h4>
                <h4 className="about-project__front-end">Front-end</h4>
            </div>
        </div>
    )
}