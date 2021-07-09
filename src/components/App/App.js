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
  const [endBig, setEndBig] = React.useState(12);
  const [endMiddle, setEndMiddle] = React.useState(8);
  const [endSmall, setEndSmall] = React.useState(5);
  const [fullSavedFilterMovies, setFullSavedFilterMovies] = React.useState([]);
  const [fullFilterMovie, setFullFilterMovie] = React.useState([]);
  const [notFindKeyword, setMissingKeyword] = React.useState(false);
  const [isLoadError, setIsLoadError] = React.useState(true);
  const [loginError, setLoginError] = React.useState(false);
  const [isUpdateProfile, setUpdateProfile] = React.useState(false);

  const history = useHistory();
  const location = useLocation();
  const width = window.innerWidth;

  // Вход в систему
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setCurrentUser(data.user);
        history.push("/movies");
      })
      .catch((error) => {
        setOpenInfoTool(true);
        setLoginError(true);
        console.log(error);
      }); 
  }

  // Регистрация пользователя
  function handleRegister(password, email, user) {
    auth.register(password, email, user)
    .then(() => {
      setOpenInfoTool(true);
      setResultSuccess(true);
  })
    .then(() => {
      handleLogin(email, password);
      setCurrentUser({
        email: email,
        name: user
      })
    })
    .catch((error) => {
      console.log(error);
      setOpenInfoTool(true);
}); 
  }

  // Клик по чекбоксу
  function clickCheckbox() {
    setFilterMovies(!isClick);
    if (fullFilterMovie.length > 0) {
      const shortMovies = fullFilterMovie.filter((movie) => movie.duration <= 40);
      setMovies(shortMovies);
      setAllShowed(true);
      if (shortMovies.length === 0) {
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

  React.useEffect(() => {
    if (!isClick) {
      if (1152 <= width) {
        setMovies(fullFilterMovie.slice(0, endBig));
        if (fullFilterMovie.length > endBig) {
          setAllShowed(false);
        } else {
          setAllShowed(true);
        }
      } else if (768 <= width && width <= 1151) {
        setMovies(fullFilterMovie.slice(0, endMiddle));
        if (fullFilterMovie.length > endMiddle) {
          setAllShowed(false);
        } else {
          setAllShowed(true);
        }
      } else if (320 <= width && width <= 767) {
        setMovies(fullFilterMovie.slice(0, endSmall));
        if (fullFilterMovie.length > endSmall) {
          setAllShowed(false);
        } else {
          setAllShowed(true);
        }
      }
    }
  }, [isClick])

  // Клик по чекбоксу на странице сохранённых фильмов
  function clickCheckboxSaved() {
    setFilterSavedMovies(!isClickSavedFilter);
    if (savedMovies.length > 0) {
      const shortMovies = savedMovies.filter((movie) => movie.duration <= 40);
      if (shortMovies.length === 0) {
        addSavedMovies([]);
        setNotFound(true);
      } else {
        addSavedMovies(shortMovies);
      }
    }
  }

  React.useEffect(() => {
    if (!isClickSavedFilter) {
      addSavedMovies(fullSavedFilterMovies);
    }
  }, [isClickSavedFilter])

  // Выход из приложения
  function handleLogOut() {
    localStorage.removeItem('jwt');
    localStorage.setItem('lastKeyword', '');
    setKeyword('');
    setMovies([]);
    setLoggedIn(false);
    setCurrentUser([]);
    history.push('/');
  }

  // Функция для проверки токена
  function tokenCheck() {
    const jwt = `${localStorage.getItem('jwt')}`;
    if (jwt !== 'null' && jwt !== 'undefind') {
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          setCurrentUser(res);
          setLoggedIn(true);
        }
      })
      .catch((error) => {
          console.log(error);
    });
    } else {
      setLoggedIn(false);
      history.push('/');
      console.log('Авторизуйтесь')
    }
  }

  // Проверка токена при каждом обновлении
  React.useEffect(() => {
    tokenCheck();
  }, []);

  // Перевожу на страницу, если пользователь зарегистрирован
  React.useEffect(() => {
    if (loggedIn === true && location.pathname === '/') {
      history.push('/movies')
    }
  }, [loggedIn])

  // Проверка данных пользователя с сервера
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserProfile()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((error) => {
          console.log(`Возникла ошибка: ${error}`)
      })
    } else {
      history.push('/');
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

  //Функция для закрытия попапа
  function closeInfoTool() {
    setOpenInfoTool(false);
  }

  //Функция для открытия попапа для редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
    setPopupOpen(true);
    closeAllPopups(false);
  }

  //Обновление данных пользователя
  function handleUpdateUser(data) {
    api.setUserProfile(data.name, data.email)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups(true);
      setOpenInfoTool(true);
      setUpdateProfile(true);
    })
    .catch((err) => {
      setOpenInfoTool(true);
        console.log(`Возникла ошибка: ${err}`)
    });
      }

  // Поиск и фильтрация фильмов
  React.useEffect(() => {
      if (!(keyword === '')) {
        localStorage.setItem('lastKeyword', keyword);
        moviesApi.getMovies()
        .then((data) => {
          const newCardMovie = data.filter(movie => movie.nameRU.includes(keyword));
          setFullFilterMovie(newCardMovie);
          if (newCardMovie.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            setNotFound(false);
            if (1152 <= width ) {
              if (newCardMovie.length <= endBig) {
                setMovies(newCardMovie);
                setAllShowed(true);
              } else {
                setMovies(newCardMovie.slice(0 , endBig));
                setAllShowed(false);
              }
            } else if (480 <= width && width < 1151) {
              if (newCardMovie.length <= endMiddle) {
                setMovies(newCardMovie);
                setAllShowed(true);
              } else {
                setMovies(newCardMovie.slice(0 , endMiddle));
                setAllShowed(false);
              }
            } else if (320 <= width && width < 420) {
              if (newCardMovie.length <= endSmall) {
                setMovies(newCardMovie);
                setAllShowed(true);
              } else {
                setMovies(newCardMovie.slice(0 , endSmall));
                setAllShowed(false);
              }
            }
          }
        })
        .catch(() => {
          setIsLoadError(true);
        })
      } else {
        setMovies([]);
        setMissingKeyword(true);
      }
  }, [keyword])

    // Поиск и фильтрация сохранённых фильмов
    React.useEffect(() => {
      if (!(savedKeyword === '')) {
        const filterMovies = savedMovies.filter(movie => movie.nameRU.includes(savedKeyword));
        setFullSavedFilterMovies(filterMovies);
        if (filterMovies.length === 0) {
          setNotFound(true);
          addSavedMovies([]);
        } else {
          setNotFound(false);
          addSavedMovies(filterMovies);
        }
    } else {
      addSavedMovies([]);
    }
  }, [savedKeyword])

  // Открытие карточек с отфильтрованными по запросу фильмами
  function openMoreMovies() {
    const stepBig = 3;
    const stepMiddle = 2;
    const stepSmall = 2;
    if (1152 <= width) {
      const step = endBig + stepBig;
      setEndBig(step);
    } else if (768 <= width && width <= 1151) {
      const step = endMiddle + stepMiddle;
      setEndMiddle(step);
    } else if (320 <= width && width <= 767) {
      const step = endSmall + stepSmall;
      setEndSmall(step);
    }
  }

  // Проверка при каждом нажатии на кнопку "Ещё" на маленьких экранах и отображение фильмов
  React.useEffect(() => {
    setMovies(fullFilterMovie.slice(0 , endSmall));
    if (endSmall >= fullFilterMovie.length) {
      setAllShowed(true)
    }
  }, [endSmall])

  // Проверка при каждом нажатии на кнопку "Ещё" на средних экранах и отображение фильмов
  React.useEffect(() => {
    setMovies(fullFilterMovie.slice(0 , endMiddle));
    if (endMiddle >= fullFilterMovie.length) {
      setAllShowed(true)
    }
  }, [endMiddle])

  // Проверка при каждом нажатии на кнопку "Ещё" на больших экранах и отображение фильмов
  React.useEffect(() => {
    setMovies(fullFilterMovie.slice(0 , endBig));
    if (endBig >= fullFilterMovie.length) {
      setAllShowed(true)
    }
  }, [endBig])

  //Функция для клика по кнопке "Сохранить"
  function handleAddSavedMovie (movie) {
    let country = '';
    if (movie.country) {
      country = movie.country;
    } else {
      country = "Страна не указана";
    }
    const director = movie.director;
    const duration = movie.duration;
    const year = movie.year;
    const description = movie.description;
    const image = 'https://api.nomoreparties.co'.concat(movie.image.url);
    const trailer = movie.trailerLink;
    const nameRU = movie.nameRU;
    let nameEN = "";
    if (movie.nameEN) {
      nameEN = movie.nameEN;
    } else {
      nameEN = "Английский вариант названия не указан";
    }
    let thumbnail = '';
    const movieId = movie.id;
    if (movie.image) {
      thumbnail = 'https://api.nomoreparties.co'.concat(movie.image.formats.thumbnail.url);
    } else {
      thumbnail = NotFound;
    }

    api.addMovie({country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId})
    .then((newMovie) => {
      addSavedMovies([newMovie, ...savedMovies]);
    })
    .catch((error) => {
      console.log(`Возникла ошибка: ${error}`)
  })
  }

  //Получаю гелерею с отфильтрованными фильмами
  React.useEffect(() => {
    const lastKeyword = `${localStorage.getItem('lastKeyword')}`
    setKeyword(lastKeyword);
}, []);

  //Получаю гелерею с сохранёнными фильмами
  React.useEffect(() => {
    api.getMovies()
    .then(res => {
      setFullSavedFilterMovies(res);
      addSavedMovies(res);
    })
    .catch((error) => {
        console.log(`Возникла ошибка: ${error}`)
    })
}, []);

  //Функция удаления карточки фильма из сохранённых
  function handleCardDelete(movie) {
    api.getMovies()
    .then((savedM) => {
      savedM.map((s) => {
        if (s.nameRU === movie.nameRU) {
          api.deleteMovie(s._id)
        .then(() => {
            //Обновляю список карточек
            api.getMovies()
            .then(res => {
              addSavedMovies(res);
            })
            .catch((error) => {
              console.log(`Возникла ошибка: ${error}`)
            })
        })
        .catch((error) => {
          console.log(`Возникла ошибка: ${error}`)
        });
        }
      })
    })
  }

  React.useEffect(() => {
    const jwt = `${localStorage.getItem('jwt')}`;
    if (jwt !== 'null' && jwt !== 'undefind') {
      if (location.pathname === '/saved-movies') {
        history.push('/saved-movies')
    } else if (location.pathname === '/profile') {
      history.push('/profile')
    } else if (location.pathname === '/movies') {
      history.push('/movies')
    }
    } else {
      history.push('/')
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Header loggedIn={loggedIn} />
            <Switch>
              <Route exact path="/" loggedIn={loggedIn}>
                <Main />
              </Route>
              <Route path="/signup">
                <Register handleRegister={handleRegister} />
                <InfoTooltip closeInfoTool={closeInfoTool} isOpenInfoTool={isOpenInfoTool} isClose={isClose} onClosePopup={closeAllPopups} resultSuccess={resultSuccess} isClick={isClick} />
              </Route>
              <Route path="/signin">
                <Login loginError={loginError} handleLogin={handleLogin} />
                <InfoTooltip closeInfoTool={closeInfoTool} isOpenInfoTool={isOpenInfoTool} isClose={isClose} onClosePopup={closeAllPopups} resultSuccess={resultSuccess} loginError={loginError} isClick={isClick} />
              </Route>
              <ProtectedRoute path="/movies" keyword={keyword} isLoadError={isLoadError} notFindKeyword={notFindKeyword} handleAddSavedMovie={handleAddSavedMovie} openMoreMovies={openMoreMovies} setKeyword={setKeyword} isNotFound={isNotFound} movies={movies} savedMovies={savedMovies} isClick={isClick} clickCheckbox={clickCheckbox} loggedIn={loggedIn} setSubmitClicked={setSubmitClicked} isSubmitClicked={isSubmitClicked} allShowed={allShowed} handleCardDelete={handleCardDelete} component={Movies} />
              <ProtectedRoute path="/saved-movies" notFindKeyword={notFindKeyword} setSavedKeyword={setSavedKeyword} loggedIn={loggedIn} component={SavedMovies} handleCardDelete={handleCardDelete} savedMovies={savedMovies} movies={movies} isClickSavedFilter={isClickSavedFilter} clickCheckboxSaved={clickCheckboxSaved} allShowed={allShowed} />
              <ProtectedRoute path="/profile" isUpdateProfile={isUpdateProfile} closeInfoTool={closeInfoTool} isOpenInfoTool={isOpenInfoTool} resultSuccess={resultSuccess} loggedIn={loggedIn} component={Profile} closeAllPopups={closeAllPopups} handleUpdateUser={handleUpdateUser} handleLogOut={handleLogOut} handleEditProfileClick={handleEditProfileClick} isEditProfilePopupOpen={isEditProfilePopupOpen} isClose={isClose} isOpen={isOpen} />
              <Route>
              </Route> 
              <Route path="*">
                <NotFoundPage />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
              </Route>
            </Switch>
            <Footer />
          </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
