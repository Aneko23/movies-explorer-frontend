import React from "react";
import { Link } from 'react-scroll';
import "./NavTab.css";

export default function NavTab() {

    return(
        <ul className="navtab-menu">
            <li className="navtab-menu__item">
                <Link to='#about-project' spy={true} smooth={true} offset={-70} duration={500} className="navtab-menu__link">О проекте</Link>
            </li>
            <li className="navtab-menu__item">
                <Link to='#techs' spy={true} smooth={true} offset={-70} duration={500} className="navtab-menu__link">Технологии</Link>
            </li>
            <li className="navtab-menu__item">
                <Link to='#about-student' spy={true} smooth={true} offset={-70} duration={500} className="navtab-menu__link">Студент</Link>
            </li>
        </ul>
    )
}