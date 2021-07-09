import React from "react";
import { Link, Switch, Route, NavLink } from "react-router-dom";
import Logo from '../../images/logo.svg';
import "./Header.css";

export default function Header (props) {
    const [isClick, setClickElement] = React.useState(false);

    function handleClick() {
        setClickElement(!isClick)
    }

    function handleClickLink() {
        setClickElement(false);
    }

    return(
                <Switch>
                    <Route exact path="/">
                        {(!props.loggedIn) ?
                        <header className="header">
                            <Link to="/" >
                                <img className="header__logo" src={Logo} alt="Логотип сайта" />
                            </Link>
                            <div className="header__container">
                                <Link to="/signup" className="register-button">Регистрация</Link>
                                <Link to="/signin" className="login-button">Войти</Link>
                            </div>
                        </header> :
                        <header className="header">
                        <div className={isClick ? "overlay_active" : "overlay"}></div>
                        <Link to="/" >
                            <img className="header-movies__logo" src={Logo} alt="Логотип сайта" />
                        </Link>
                        <div className="header__burger-menu" onClick={handleClick} >
                            <div className={`burger-line ${isClick && "burger-line__top"}`}></div>
                            <div className={`burger-line ${isClick && "burger-line__middle"}`}></div>
                            <div className={`burger-line ${isClick && "burger-line__bottom"}`}></div>
                        </div>
                        <nav className={`header__menu ${isClick && "header__menu_active"}`}>
                            <div className="header__menu-items">
                                <NavLink exact to="/" className="header__menu-link" onClick={handleClickLink} activeClassName="header-link_active">Главная</NavLink>
                                <NavLink to="/movies" className="header__menu-link" onClick={handleClickLink} activeClassName="header-link_active">Фильмы</NavLink>
                                <NavLink to="/saved-movies" className="header__menu-link" onClick={handleClickLink} activeClassName="header-link_active">Сохранённые фильмы</NavLink>
                            </div>
                            <NavLink to="/profile" className="header__menu-profile" onClick={handleClickLink} activeClassName="header-link_active">Аккаунт
                                <div className="header-movies__profile-icon" />
                            </NavLink>
                        </nav>
                        <nav className="header-movies__container">
                            <div className="header-movies__links">
                                <NavLink to="/movies" className="header-link" activeClassName="header-link_active">Фильмы</NavLink>
                                <NavLink to="/saved-movies" className="header-link" activeClassName="header-link_active">Сохранённые фильмы</NavLink>
                            </div>
                            <NavLink to="/profile" className="header-movies__profile" activeClassName="header-link_active">Аккаунт
                                <div className="header-movies__profile-icon" />
                            </NavLink>
                        </nav>
                    </header>
                        }
                    </Route>

                    <Route path="/signup">
                        <header className="header__register">
                            <div className="header__register-container">
                                <Link to="/" >
                                    <img className="header__register-logo" src={Logo} alt="Логотип сайта" />
                                </Link>
                            </div>
                        </header>
                    </Route>

                    <Route path="/signin">
                        <header className="header__register">
                            <div className="header__register-container">
                                <Link to="/" >
                                    <img className="header__register-logo" src={Logo} alt="Логотип сайта" />
                                </Link>
                            </div>
                        </header>
                    </Route>

                    <Route path={["/movies", "/saved-movies", "/profile"]}>
                        <header className="header-movies">
                            <div className={isClick ? "overlay_active" : "overlay"}></div>
                            <Link to="/" >
                                <img className="header-movies__logo" src={Logo} alt="Логотип сайта" />
                            </Link>
                            <div className="header__burger-menu" onClick={handleClick} >
                                <div className={`burger-line ${isClick && "burger-line__top"}`}></div>
                                <div className={`burger-line ${isClick && "burger-line__middle"}`}></div>
                                <div className={`burger-line ${isClick && "burger-line__bottom"}`}></div>
                            </div>
                            <nav className={`header__menu ${isClick && "header__menu_active"}`}>
                                <div className="header__menu-items">
                                    <NavLink exact to="/" className="header__menu-link" onClick={handleClickLink} activeClassName="header-link_active">Главная</NavLink>
                                    <NavLink to="/movies" className="header__menu-link" onClick={handleClickLink} activeClassName="header-link_active">Фильмы</NavLink>
                                    <NavLink to="/saved-movies" className="header__menu-link" onClick={handleClickLink} activeClassName="header-link_active">Сохранённые фильмы</NavLink>
                                </div>
                                <NavLink to="/profile" className="header__menu-profile" onClick={handleClickLink} activeClassName="header-link_active">Аккаунт
                                    <div className="header-movies__profile-icon" />
                                </NavLink>
                            </nav>
                            <nav className="header-movies__container">
                                <div className="header-movies__links">
                                    <NavLink to="/movies" className="header-link" activeClassName="header-link_active">Фильмы</NavLink>
                                    <NavLink to="/saved-movies" className="header-link" activeClassName="header-link_active">Сохранённые фильмы</NavLink>
                                </div>
                                <NavLink to="/profile" className="header-movies__profile" activeClassName="header-link_active">Аккаунт
                                    <div className="header-movies__profile-icon" />
                                </NavLink>
                            </nav>
                        </header>
                    </Route>
                </Switch>
            
    )
}