class Api {
    constructor({adress, token}) {
        this._adress = adress;
        this._token = token
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
    } 

    getMovies() {
        return fetch(`${this._adress}/movies`, {
            method: 'GET',
            headers: {
                authorization: this._token
              }
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        })
    }

    addMovie({country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId}) {
        return fetch(`${this._adress}/movies`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailer,
                nameRU,
                nameEN,
                thumbnail,
                movieId
            })
        })
        .then(this._getResponseData)
    }

    deleteMovie(id) {
        return fetch(`${this._adress}/movies/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token
              }
        })
        .then(this._getResponseData)
    }

    getUserProfile() {
        return fetch(`${this._adress}/users/me`, {
        method: 'GET',
        headers: {
            authorization: this._token
          },
    })
    .then(this._getResponseData)
  }

  setUserProfile(name, email) {
    return fetch(`${this._adress}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            name,
            email,
        }),
    })
    .then(this._getResponseData)
  }

}

const token = localStorage.getItem('jwt');

const api = new Api ({
    adress: 'https://api-movies.aneko23.nomoredomains.monster',
    token: `Bearer ${token}`
}) 

export default api;