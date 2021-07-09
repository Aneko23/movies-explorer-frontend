import React from 'react';
import { Route } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './SearchForm.css';

export default function SearchForm (props) {
    const [isFetching, toggleIsFetching] = React.useState(false);
    const [keyword, setKeyword] = React.useState('');
    const [isClickedKeyword, setIsClickedKeyword] = React.useState(false);
    const [keywordError, setKeywordError] = React.useState("");
    const [isClick, setClicked] = React.useState(false);

    const keywordChange = (e) => {
        setKeyword(e.target.value);
        if (!e.target.value) {
            setKeywordError("Нужно ввести ключевое слово")
        } else {
            setKeywordError("")
        }
    }

    function clickInput() {
        setClicked(true)
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'keyword':
                setIsClickedKeyword(true)
                break

            // no default
        }
    }

    function handleClickCheckbox() {
        props.clickCheckbox();
    }

    function handleClickCheckboxSaved() {
        props.clickCheckboxSaved();
    }

    function handleSubmit(e) {
        toggleIsFetching(true);
        e.preventDefault();
        props.setKeyword(keyword);
    }

    React.useEffect(() => {
        toggleIsFetching(false);
    }, [props.movies])

    function handleFindSavedMovies(e) {
        e.preventDefault();
        props.setSavedKeyword(props.keyword);
    }

    return (
        <div className="search">
            <Route path="/movies">
            <div className="search-form__container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input onBlur={e => blurHandler(e)} className={`search-form__input ${keywordError ? "search-form__input_error" : "search-form__input_basic"}`} id="form-keyword" name="keyword" onClick={clickInput} value={isClick ? keyword : props.keyword} onChange={e => keywordChange(e)} required type="text" placeholder="Фильм"></input>
                <button className="search-form__button" type="submit" />
            </form>
            {(isClickedKeyword && keywordError) && <span className="search-form__input-error" id="form-error">{keywordError}</span>}
            </div>
            <div className="search__checkbox" onClick={handleClickCheckbox} >
                <div className={`search__ellipse ${props.isClick ? "search__ellipse_active" : "search__ellipse_inactive"}`}>
                    <div className={`search__circle ${props.isClick ? "search__circle_active" : "search__circle_inactive"}`} />
                </div>
                <p className="search__name">Короткометражки</p>
            </div>
            {isFetching && <Preloader isFetching={isFetching} />}
            </Route>
            <Route path="/saved-movies">
            <form className="search-form" onSubmit={handleFindSavedMovies}>
                <input onBlur={e => blurHandler(e)} className="search-form__input" id="form-keyword" name="keyword" value={keyword} onChange={e => keywordChange(e)} required type="text" placeholder="Фильм" />
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