class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: `${this._options.headers.authorization}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  setCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  getInfoUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: `${this._options.headers.authorization}`
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }

  setInfoUser(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      })
    })
  }

  setAvatarUser(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
  }

  setLikes(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-type': 'application/json'
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
  }

  deleteLikes(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._options.headers.authorization}`,
        'Content-type': 'application/json'
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
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


