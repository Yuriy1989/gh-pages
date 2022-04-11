import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._formPopap = this._popup.querySelector('.popup__form');
    this._popup__button = this._formPopap.querySelector('.popup__button');
  }

  _getInputValues() {
    const arrayInputList = {};
    this._inputList.forEach((item) => {
      arrayInputList[item.name] = item.value;
    });
    return arrayInputList;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
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
    this._formPopap.reset();
  }

  loading(data) {
    this._popup__button.value = data;
  }
}
