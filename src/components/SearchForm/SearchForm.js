import React from 'react';
import { Route } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm (props) {
    const [data, setData] = React.useState({
        keyword: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    function handleClickCheckbox() {
        props.clickCheckbox();
    }

    function handleClickCheckboxSaved() {
        props.clickCheckboxSaved();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { keyword } = data;
        props.setKeyword(keyword);
    }

    function handleFindSavedMovies(e) {
        e.preventDefault();
        const { keyword } = data;
        props.setSavedKeyword(keyword);
    }

    return (
        <div className="search">
            <Route path="/movies">
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-form__input" id="form-keyword" name="keyword" value={data.keyword} onChange={handleChange} required type="text" placeholder="Фильм" />
                <span className= "search-form__input-error" id='form-name-error' />
                <button className="search-form__button" type="submit" />
            </form>
            <div className="search__checkbox" onClick={handleClickCheckbox} >
                <div className={`search__ellipse ${props.isClick ? "search__ellipse_active" : "search__ellipse_inactive"}`}>
                    <div className={`search__circle ${props.isClick ? "search__circle_active" : "search__circle_inactive"}`} />
                </div>
                <p className="search__name">Короткометражки</p>
            </div>
            </Route>
            <Route path="/saved-movies">
            <form className="search-form" onSubmit={handleFindSavedMovies}>
                <input className="search-form__input" id="form-keyword" name="keyword" value={data.keyword} onChange={handleChange} required type="text" placeholder="Фильм" />
                <span className= "search-form__input-error" id='form-name-error' />
                <button className="search-form__button" type="submit" />
            </form>
            <div className="search__checkbox" onClick={handleClickCheckboxSaved} >
                <div className={`search__ellipse ${props.isClickSavedFilter ? "search__ellipse_active" : "search__ellipse_inactive"}`}>
                    <div className={`search__circle ${props.isClickSavedFilter ? "search__circle_active" : "search__circle_inactive"}`} />
                </div>
                <p className="search__name">Короткометражки</p>
            </div>
            </Route>
        </div>
    )
}