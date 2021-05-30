import React from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import '../../index.css';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import api from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import * as moviesApi from '../../utils/MoviesApi';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import NotFound from '../../images/not-image.png';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);
  const [savedMovies, addSavedMovies] = React.useState([]);
  const [isClick, setFilterMovies] = React.useState(false);
  const [isClickSavedFilter, setFilterSavedMovies] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [resultSuccess, setResultSuccess] = React.useState(false);
  const [isOpen, setPopupOpen] = React.useState(false);
  const [isOpenInfoTool, setOpenInfoTool] = React.useState(false);
  const [isClose, closeAllPopups] = React.useState(true);
  const [isSubmitClicked, setSubmitClicked] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isNotFound, setNotFound] = React.useState(false);
  const [allShowed, setAllShowed] = React.useState(true);
  const [keyword, setKeyword] = React.useState('');
  const [savedKeyword, setSavedKeyword] = React.useState('');
  const [isSaved, setSavedMovie] = React.useState(false);
  const [endBig, setEndBig] = React.useState(9);
  const [endMiddle, setEndMiddle] = React.useState(6);
  const [endSmall, setEndSmall] = React.useState(5);

  const history = useHistory();
  const location = useLocation();
  const width = window.innerWidth;

  // Вход в систему
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  // Регистрация пользователя
  function handleRegister(password, email, user) {
    auth.register(password, email, user)
    .then(() => {
      setOpenInfoTool(true);
      setResultSuccess(true);
      handleLogin(email, password);
  })
    .catch((error) => {
      console.log(error);
      setPopupOpen(true);
}); 
  }

  // Клик по чекбоксу
  function clickCheckbox() {
    setFilterMovies(!isClick);
    if (movies.length > 0) {
      const shortMovies = movies.filter((movie) => movie.duration <= 40)
      if (shortMovies.length === 0) {
        setMovies(shortMovies);
        setNotFound(true);
      }
    } else {
      moviesApi.getMovies()
      .then((data) => {
        const shortMovies = data.filter((movie) => movie.duration <= 40);
        setMovies(shortMovies)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  // Клик по чекбоксу на странице сохранённых фильмов
  function clickCheckboxSaved() {
    setFilterSavedMovies(!isClickSavedFilter);
    if (savedMovies.length > 0) {
      const shortMovies = savedMovies.filter((movie) => movie.duration <= 40)
      if (shortMovies.length === 0) {
        addSavedMovies(shortMovies);
        setNotFound(true);
      } else {
        addSavedMovies(shortMovies);
      }
    }
  }

  // Выход из приложения
  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  }

  // Функция для проверки токена
  function tokenCheck() {
    const jwt = `${localStorage.getItem('jwt')}`;
    if (jwt) {
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          setCurrentUser(res);
          setLoggedIn(true);
          history.push(location.pathname);
        }
      })
      .catch((error) => {
          console.log(error);
    });
    } else {
        setLoggedIn(false);
        console.log('Авторизуйся')
    }
  }

  // Проверка токена при каждом обновлении
  React.useEffect(() => {
    tokenCheck();
  }, [history]);

  //Проверка данных пользователя с сервера
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserProfile()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((error) => {
          console.log(`Возникла ошибка: ${error}`)
      })
    }
  }, []);

  // Закрытие попапов
  React.useEffect(() => {
    if (isClose) {
      setEditProfilePopupOpen(false);
      setResultSuccess(false);
      setPopupOpen(false);
    }
  }, [isClose])

  //Функция для открытия попапа для редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setPopupOpen(true);
    closeAllPopups(false);
  }

  //Обновление данных пользователя
  function handleUpdateUser(data) {
    console.log(data)
    api.setUserProfile(data.name, data.email)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups(true);
    })
    .catch((err) => {
        console.log(`Возникла ошибка: ${err}`)
    });
  }

  // Поиск и фильтрация фильмов
  React.useEffect(() => {
      if (!(keyword === '')) {
        moviesApi.getMovies()
        .then((data) => {
          const newCardMovie = data.filter(movie => movie.nameRU.includes(keyword));
          if (newCardMovie.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            setNotFound(false);
            setAllShowed(false);
            if (768 < width < 1280) {
              setMovies(newCardMovie.slice(0 , endBig));
            } else if (480 < width < 768) {
              setMovies(newCardMovie.slice(0 , endMiddle));
            } else if (320 < width < 420) {
              setMovies(newCardMovie.slice(0 , endSmall));
            }
            if (movies.length < 5) {
              setAllShowed(true);
            }
          }
        })
      } else {
        setMovies([]);
      }
  }, [keyword])

    // Поиск и фильтрация  сохранённых фильмов
    React.useEffect(() => {
      if (!(savedKeyword === '')) {
        const filterMovies = savedMovies.filter(movie => movie.nameRU.includes(savedKeyword))
        if (filterMovies.length === 0) {
          setNotFound(true);
          addSavedMovies([]);
        } else {
          setNotFound(false);
          setAllShowed(false);
          if (768 < width < 1280) {
            addSavedMovies(filterMovies.slice(0 , endBig));
          } else if (480 < width < 768) {
            addSavedMovies(filterMovies.slice(0 , endMiddle));
          } else if (320 < width < 420) {
            addSavedMovies(filterMovies.slice(0 , endSmall));
          }
          if (savedMovies.length < 5) {
            setAllShowed(true);
          }
        }
    } else {
      addSavedMovies([]);
    }
  }, [savedKeyword])

  // Открытие карточек с отфильтрованными по запросу фильмами
  function openMoreMovies() {
    const stepBig = 3;
    const stepMiddle = 2;
    const stepSmall = 1;
    if (768 < width) {
      setMovies(movies.slice(0 , setEndBig(endBig + stepBig)));
    } else if (480 < width < 768) {
      setMovies(movies.slice(0 , setEndMiddle(endMiddle + stepMiddle)));
    } else if (320 < width < 420) {
      setMovies(movies.slice(0 , setEndSmall(endSmall + stepSmall)));
    }
    if (movies.length < (endBig + stepBig)) {
      setAllShowed(true);
    }
  }

  //Функция для клика по кнопке "Сохранить"
  function handleAddSavedMovie (movie) {
    const country = movie.country;
    const director = movie.director;
    const duration = movie.duration;
    const year = movie.year;
    const description = movie.description;
    const image = 'https://api.nomoreparties.co'.concat(movie.image.url);
    const trailer = movie.trailerLink;
    const nameRU = movie.nameRU;
    const nameEN = movie.nameEN;
    let thumbnail = '';
    const movieId = movie.id;
    if(movie.image) {
      thumbnail = 'https://api.nomoreparties.co'.concat(movie.image.formats.thumbnail.url);
    } else {
      thumbnail = NotFound;
    }
    
    api.addMovie({country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId})
    .then((newMovie) => {
      addSavedMovies([newMovie, ...savedMovies]);
      setSavedMovie(true);
    })
    .catch((error) => {
      console.log(`Возникла ошибка: ${error}`)
  })
  }

  //Получаю гелерею с сохранёнными карточками
  React.useEffect(() => {
    api.getMovies()
    .then(res => {
      if (768 < width < 1280) {
        addSavedMovies(res.slice(0 , endBig));
      } else if (480 < width < 768) {
        addSavedMovies(res.slice(0 , endMiddle));
      } else if (320 < width < 420) {
        addSavedMovies(res.slice(0 , endSmall));
      }
    })
    .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
}, []);

  //Функция удаления карточки
  function handleCardDelete(movie) {
    api.deleteMovie(movie._id)
      .then(() => {
          //Обновляю список карточек
          api.getMovies()
          .then(res => {
            addSavedMovies(res)
          })
          .catch((error) => {
            console.log(`Возникла ошибка: ${error}`)
          })
      })
      .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    });
  }

  //Открытие карточек с сохранёнными фильмами после нажатия на кнопку "Ещё"
  function openMoreSavedMovies() {
    api.getMovies()
    .then((res) => {
      const stepBig = 3;
      const stepMiddle = 2;
      const stepSmall = 1;
      if (768 < width) {
        addSavedMovies(res.slice(0 , setEndBig(endBig + stepBig)));
      } else if (480 < width < 768) {
        addSavedMovies(res.slice(0 , setEndMiddle(endMiddle + stepMiddle)));
      } else if (320 < width < 420) {
        addSavedMovies(res.slice(0 , setEndSmall(endSmall + stepSmall)));
      }
      if (savedMovies.length < (endBig + stepBig)) {
        setAllShowed(true);
      }
    })
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
                <Register handleRegister={handleRegister} />
                <InfoTooltip isOpenInfoTool={isOpenInfoTool} isClose={isClose} onClosePopup={closeAllPopups} resultSuccess={resultSuccess} />
              </Route>
              <Route path="/signin">
                <Login handleLogin={handleLogin} />
              </Route>
              <ProtectedRoute path="/movies" isSaved={isSaved} handleAddSavedMovie={handleAddSavedMovie} openMoreMovies={openMoreMovies} setKeyword={setKeyword} isNotFound={isNotFound} movies={movies} savedMovies={savedMovies} isClick={isClick} clickCheckbox={clickCheckbox} loggedIn={loggedIn} setSubmitClicked={setSubmitClicked} isSubmitClicked={isSubmitClicked} allShowed={allShowed} component={Movies} />
              <ProtectedRoute path="/saved-movies" setSavedKeyword={setSavedKeyword} loggedIn={loggedIn} component={SavedMovies} openMoreSavedMovies={openMoreSavedMovies} handleCardDelete={handleCardDelete} savedMovies={savedMovies} movies={movies} isClickSavedFilter={isClickSavedFilter} clickCheckboxSaved={clickCheckboxSaved} allShowed={allShowed} />
              <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} closeAllPopups={closeAllPopups} handleUpdateUser={handleUpdateUser} handleLogOut={handleLogOut} handleEditProfileClick={handleEditProfileClick} isEditProfilePopupOpen={isEditProfilePopupOpen} isClose={isClose} isOpen={isOpen} />
              <Route>
              {loggedIn ? <Redirect to={location} /> : <Redirect to="/" />}
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
