export class UserInfo {
  constructor ({profile__title, profile__text}) {
    this._valueProfileName = document.querySelector(profile__title);
    this._valueProfileText = document.querySelector(profile__text);
  }

  getUserInfo() {
    return {text: this._valueProfileText.textContent, name: this._valueProfileName.textContent};
  }

  setUserInfo(data) {
    this._valueProfileName.textContent = data.name;
    this._valueProfileText.textContent = data.text;
  }
}
