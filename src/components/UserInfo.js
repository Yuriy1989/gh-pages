export class UserInfo {
  constructor ({profileTitle, profileText}) {
    this._valueProfileName = document.querySelector(profileTitle);
    this._valueProfileText = document.querySelector(profileText);
  }

  getUserInfo() {
    return {text: this._valueProfileText.textContent, name: this._valueProfileName.textContent};
  }

  setUserInfo(data) {
    this._valueProfileName.textContent = data.yourName;
    this._valueProfileText.textContent = data.text;
  }
}
