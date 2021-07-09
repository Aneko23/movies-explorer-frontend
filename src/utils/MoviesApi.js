export const getMovies = () => {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
        method: 'GET',
    }).then((result) => {
        if (!result.ok) {
            return Promise.reject('Server error');
        }
        return result.json();
    }).then((data) => {
        return data;
    })
  };

/*
    headers: {
        authorization: this._token
    }
*/