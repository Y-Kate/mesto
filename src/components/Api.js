class Api {
  constructor(option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',  
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',  
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  editProfile( authorName, authorAbout ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',  
      headers: this._headers,
      body: JSON.stringify({
        name: authorName,
        about: authorAbout
      })
    })
    .then(this._handleResponse)
  }

  addNewCard( cardName, cardLink ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',  
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(this._handleResponse)
  }

  deleteCard( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',  
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',  
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',  
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',  
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(this._handleResponse)
  }
}

export default Api;