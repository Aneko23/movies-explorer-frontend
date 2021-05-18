import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../index.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import movies from '../../utils/movies';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [savedMovies, addSavedMovies] = React.useState([]);
  const [isClick, setFilterMovies] = React.useState(false);

  function saveMovie(movie) {
    const newMovie = movies.map(m => m._id === movie._id ? movie : m);
    addSavedMovies(newMovie);
  }

  function clickCheckbox() {
    setFilterMovies(!isClick);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Header />
            <Switch>
              <Route exact path="/" >
                <Main />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/signin">
                <Login />
              </Route>
              <Route path="/movies">
                <Movies saveMovie={saveMovie} movies={movies} isClick={isClick} clickCheckbox={clickCheckbox} />
              </Route>
              <Route path="/saved-movies">
                <SavedMovies savedMovies={savedMovies} movies={movies} isClick={isClick} clickCheckbox={clickCheckbox} />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
