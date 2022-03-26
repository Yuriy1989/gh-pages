import {Popup} from './Popup.js';
import {formValidators} from '../pages/index.js';


export class PopupWithForm extends Popup {
  constructor (popupSelector, enableValidation) {
    super(popupSelector);
    this._enableValidation = enableValidation;
  }

  _getInputValues() {
    const inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    const arrayInputList = {};
    inputList.forEach((item) => {
      arrayInputList[item.id]= item.value;
    });
    return arrayInputList;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._enableValidation(this._getInputValues());
    });
  }

  close() {
    super.close();
    formValidators['card-form'].resetValidation()
  }
}
