import {Popup} from './Popup.js';

export class PopupWithFormInfo extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._resetPopap = this._popup.querySelector('.popup__form')
  }

  handlerSubmitBtnDelete(submitBntDelete) {
    this._handleSubmit = submitBntDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
