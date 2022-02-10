// const formInput = document.querySelector('.popup__input');


//Функция включения валидации форм
// function enableValidation () {
//   enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });
// }

const isValid = (formElement, inputElement) => {
  console.log("функция проверки каждого INPUT");
  console.log(formElement + inputElement);

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    console.log('Ошибка валидации');
  } else {
    hideInputError(formElement, inputElement);
    console.log('Ошибок нет');
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  console.log(formElement);
  console.log(inputElement.id + '-error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log('Открытие текста ошибки' + errorElement);
  errorElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__input-error');
}

const setEventListener = (formElement) => {
  console.log("функция перебора всех элементов по всем формам");
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  console.log("Все input элементы в данной форме " + inputList);
  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
    })
  });
}

const enableValidation = () => {
  console.log("функция сбора всех форм");
  const formLists = Array.from(document.querySelectorAll('.popup__form'));
  console.log("массив форм" + formLists);
  formLists.forEach((formElement) => {
    console.log("каждая форма по отдельности" + formElement);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
};

enableValidation();


// formElement.addEventListener('input', (evt) => {
//   isValid();
//   console.log(evt.target.validity.valid);
// });
