import React from 'react';
import './SearchForm.css';

export default function SearchForm (props) {

    function handleClickCheckbox() {
        props.clickCheckbox();
    }

    return (
        <div className="search">
            <form className="search-form">
                <input className="search-form__input" placeholder="Фильм" />
                <button className="search-form__button" type="submit" />
            </form>
            <div className="search__checkbox" onClick={handleClickCheckbox} >
                <div className={`search__ellipse ${props.isClick ? "search__ellipse_active" : "search__ellipse_inactive"}`}>
                    <div className={`search__circle ${props.isClick ? "search__circle_active" : "search__circle_inactive"}`} />
                </div>
                <p className="search__name">Короткометражки</p>
            </div>
        </div>
    )
}