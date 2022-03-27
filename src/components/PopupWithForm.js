import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));

  }

  _getInputValues() {
    const arrayInputList = {};
    this._inputList.forEach((item) => {
      arrayInputList[item.id]= item.value;
    });
    return arrayInputList;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
