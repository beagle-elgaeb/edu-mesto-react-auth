class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._groupID = options.groupID;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(this._handleResult);
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(this._handleResult);
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._handleResult);
  }

  setProfileData(name, about) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResult);
  }

  createCard(name, link) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._handleResult);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResult);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers
    })
      .then(this._handleResult);
  }

  unlikeCard(id) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._handleResult);
  }

  _handleResult(res) {
    if (res.ok) { return res.json() }
    return Promise.reject(`Статут ошибки: ${res.status}`);
  }
}

const api = new Api(
  {
    baseUrl: "https://mesto.nomoreparties.co/v1",
    groupID: "cohort-26",
    headers: {
      authorization: "05288f01-26d1-4add-96c0-b100674c662e",
      "Content-Type": "application/json"
    }
  });

export default api;