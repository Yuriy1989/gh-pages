const dataValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  //Метод сбора всех input и добавления слушателей на input
  _collectAllForms() {
    const inputList = Array.from(formElement.querySelectorAll(itemsValidation.inputSelector));
    const buttonElement = formElement.querySelector(itemsValidation.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, itemsValidation);
    inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, itemsValidation);
        toggleButtonState(inputList, buttonElement, itemsValidation);
      })
    });
  }

  //Метод сбора всех форм на страничке
  _setEventListener() {
    console.log('input test');
  }

  //Метод включения валидации форм
  enableValidation() {
    this._collectAllForms();
  }
}

const validationPopupAddCard = new FormValidator(dataValidation, '.popup_add-card');
validationPopupAddCard.enableValidation();

//Функция проверки input по заданным параметрам
const isValid = (formElement, inputElement, itemsValidation) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, itemsValidation);
  } else {
    hideInputError(formElement, inputElement, itemsValidation);
  }
}

//Функция включения информация об ошибке
const showInputError = (formElement, inputElement, errorMessage, itemsValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(itemsValidation.inputErrorClass);
  errorElement.classList.add(itemsValidation.errorClass);
  errorElement.textContent = errorMessage;
}

//Функция отключения информация об ошибке
const hideInputError = (formElement, inputElement, itemsValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(itemsValidation.errorClass);
  inputElement.classList.remove(itemsValidation.inputErrorClass);
}

//Функция проверки хотябы одного невалидного поля для блокировки кнопки submit
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Функция отключения кнопки
const disableButton = (buttonElement, itemsValidation) => {
  buttonElement.setAttribute('disabled', '');
  buttonElement.classList.add(itemsValidation.inactiveButtonClass);
}

//Функция включения кнопки
const activateButton = (buttonElement, itemsValidation) => {
  buttonElement.removeAttribute('disabled', '');
  buttonElement.classList.remove(itemsValidation.inactiveButtonClass)
}

//Функция включения и отключения кнопки sumbit в popup
const toggleButtonState = (inputList, buttonElement, itemsValidation) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, itemsValidation);
  } else {
    activateButton(buttonElement, itemsValidation);
  }
}

//Функция сбора всех input
const setEventListener = (formElement, itemsValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(itemsValidation.inputSelector));
  const buttonElement = formElement.querySelector(itemsValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, itemsValidation);
  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, itemsValidation);
      toggleButtonState(inputList, buttonElement, itemsValidation);
    })
  });
}

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
