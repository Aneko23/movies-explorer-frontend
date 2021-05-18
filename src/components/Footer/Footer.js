import React from "react";
import "./Footer.css";
import { Switch, Route } from "react-router-dom";

export default function Footer() {

    return(
        <footer className="footer">
            <Switch>
            <Route exact path={["/", "/movies", "/saved-movies"]}>
                    <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer__line"></div>
                    <div className="footer__container">
                        <p className="footer__copyright">&#169;2021</p>
                        <div className="footer__network">
                            <a href="https://praktikum.yandex.ru/" target="_blank" className="footer__link" rel="noreferrer">Я.Практикум</a>
                            <a href="https://github.com/" target="_blank" className="footer__link" rel="noreferrer">Github</a>
                            <a href="https://www.facebook.com/" target="_blank" className="footer__link" rel="noreferrer">Facebook</a>
                        </div>
                    </div>
                </Route>
            </Switch>
        </footer>
    )
}