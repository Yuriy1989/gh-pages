import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  _getInputValues() {

  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-image')) {
        this.close()
      }
    })
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
