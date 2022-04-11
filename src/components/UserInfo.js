export class UserInfo {
  constructor ({profileTitle, profileText, profileAvatar}) {
    this._valueProfileName = document.querySelector(profileTitle);
    this._valueProfileText = document.querySelector(profileText);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {about: this._valueProfileText.textContent, name: this._valueProfileName.textContent};
  }

  getUserAvatar() {
    return {avatar: this._profileAvatar.style.backgroundImage.slice(5, -2)};
  }

  setUserInfo(data) {
    this._valueProfileName.textContent = data.name;
    this._valueProfileText.textContent = data.about;
  }

  setUserAvatar(data) {
    this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  }

}
