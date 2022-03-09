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
  _disableButton () {
    this._buttonElement.setAttribute('disabled', '');
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  //Метод включения кнопки
  _activateButton () {
    this._buttonElement.removeAttribute('disabled', '');
    this._buttonElement.classList.remove(this._inactiveButtonClass)
  }

  //Метод включения и отключения кнопки sumbit в popup
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._activateButton();
    }
  }

  //Метод включения информация об ошибке
  _showInputError (inputElement, errorMessage) {
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

  //Метод включения валидации форм
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}



// //Функция проверки input по заданным параметрам
// const isValid = (formElement, inputElement, itemsValidation) => {
//   if(!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, itemsValidation);
//   } else {
//     hideInputError(formElement, inputElement, itemsValidation);
//   }
// }

// //Функция включения информация об ошибке
// const showInputError = (formElement, inputElement, errorMessage, itemsValidation) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(itemsValidation.inputErrorClass);
//   errorElement.classList.add(itemsValidation.errorClass);
//   errorElement.textContent = errorMessage;
// }

// //Функция отключения информация об ошибке
// const hideInputError = (formElement, inputElement, itemsValidation) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.classList.remove(itemsValidation.errorClass);
//   inputElement.classList.remove(itemsValidation.inputErrorClass);
// }

// //Функция проверки хотябы одного невалидного поля для блокировки кнопки submit
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// //Функция отключения кнопки
// const disableButton = (buttonElement, itemsValidation) => {
//   buttonElement.setAttribute('disabled', '');
//   buttonElement.classList.add(itemsValidation.inactiveButtonClass);
// }

// //Функция включения кнопки
// const activateButton = (buttonElement, itemsValidation) => {
//   buttonElement.removeAttribute('disabled', '');
//   buttonElement.classList.remove(itemsValidation.inactiveButtonClass)
// }

// //Функция включения и отключения кнопки sumbit в popup
// const toggleButtonState = (inputList, buttonElement, itemsValidation) => {
//   if (hasInvalidInput(inputList)) {
//     disableButton(buttonElement, itemsValidation);
//   } else {
//     activateButton(buttonElement, itemsValidation);
//   }
// }

// //Функция сбора всех input
// const setEventListener = (formElement, itemsValidation) => {
//   const inputList = Array.from(formElement.querySelectorAll(itemsValidation.inputSelector));
//   const buttonElement = formElement.querySelector(itemsValidation.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, itemsValidation);
//   inputList.forEach( (inputElement) => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, itemsValidation);
//       toggleButtonState(inputList, buttonElement, itemsValidation);
//     })
//   });
// }

//Функция сбора всех форм на страничке
// const enableValidation = (itemsValidation) => {
//   const formLists = Array.from(document.querySelectorAll(itemsValidation.formSelector));
//   formLists.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListener(formElement, itemsValidation);
//   });
// };

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
