import {Popup} from './Popup.js';
import {config} from './utils.js';
import {FormValidator} from './FormValidation.js'

export class PopupWithForm extends Popup {
  constructor (popupSelector, enableValidation) {
    super(popupSelector);
    this._enableValidation = enableValidation;
  }

  _getInputValues() {
    this._formValidators = {};
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    });
    enableValidation(config);
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
    popupAddCard.querySelector('.popup__form_add-card').addEventListener('submit', handleCardFormSubmit);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._formValidators['card-form'].resetValidation();
  }
}
