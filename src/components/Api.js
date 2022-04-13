class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  setCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      })
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  getInfoUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  setInfoUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      })
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  setAvatarUser(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  setLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }

  deleteLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then( res => this._getResponse(res))
      .catch(console.log)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '6f74b82d-4370-4583-b5d4-d634d4b0c354',
    'Content-Type': 'application/json'
  }
})


