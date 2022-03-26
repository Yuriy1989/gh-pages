export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //Метод проверки хотябы одного невалидного поля для блокировки кнопки submit
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод отключения кнопки
  _disableButton() {
    this._buttonElement.setAttribute('disabled', '');
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  //Метод включения кнопки
  _activateButton() {
    this._buttonElement.removeAttribute('disabled', '');
    this._buttonElement.classList.remove(this._inactiveButtonClass)
  }

  //Метод включения и отключения кнопки sumbit в popup
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._activateButton();
    }
  }

  //Метод включения информация об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  //Метод отключения информация об ошибке
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  //Метод проверки input по заданным параметрам
  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Метод сбора всех input и добавления слушателей на input
  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    });
  }

  //Метод сброса input при открытии форм
  resetValidation() {
    this._disableButton();
    this._inputList.forEach( (inputElement) => {
        this._hideInputError(inputElement);
        inputElement.value = '';
      });
  }

  //Метод включения валидации форм
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}
