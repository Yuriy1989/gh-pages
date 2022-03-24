import {Popup} from './Popup.js';
import {popupAddCard} from './utils.js';


export class PopupWithForm extends Popup {
  constructor (popupSelector, enableValidation) {
    super(popupSelector);
    this._enableValidation = enableValidation;
  }

  _getInputValues() {
    const inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    const arrayInputList = [];
    inputList.forEach((item) => {
      arrayInputList.push(item.value);
    });
    // console.log(arrayInputList);
    return arrayInputList;
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
    popupAddCard.querySelector('.popup__form_add-card').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._enableValidation(this._getInputValues());
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    // this._formValidators['card-form'].resetValidation();
  }
}
