const formElement = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__input');


//Функция включения валидации форм
function enableValidation () {
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
}

formInput.addEventListener('input', (evt) => {
  isValid();
  console.log(evt.target.validity.valid);
});

const isValid = () => {
  if(!formInput.validity.valid) {
    console.log('Ошибка валидации');
  } else {
    console.log('Ошибок нет');
  }
}
