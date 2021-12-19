class Api {
  constructor() {

  }

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-31/users/me', {
      method: 'GET',  
      headers: {
        authorization: 'c1e5c7f7-edbc-434c-87e1-05004dec9bd7'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Произошла ошибка ${res.status}`);
    })
  }

  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-31/cards', {
      method: 'GET',  
      headers: {
        authorization: 'c1e5c7f7-edbc-434c-87e1-05004dec9bd7'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
  }

  editProfile( authorName, authorAbout ) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-31/users/me', {
      method: 'PATCH',  
      headers: {
        authorization: 'c1e5c7f7-edbc-434c-87e1-05004dec9bd7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: authorName,
        about: authorAbout
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
  }

  addNewCard( cardName, cardLink ) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-31/cards', {
      method: 'POST',  
      headers: {
        authorization: 'c1e5c7f7-edbc-434c-87e1-05004dec9bd7',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
  }

}



export default Api;