let profileEditPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_string_name');
let jobInput = document.querySelector('.popup__input_string_text');
let valueProfileTitle = document.querySelector('.profile__title');
let valueProfileText = document.querySelector('.profile__text');

function openPopup (event) {
  popup.classList.add('popup_opened');
  let textProfileTitle = valueProfileTitle.textContent;
  let textProfileText = valueProfileText.textContent;
  nameInput.value = textProfileTitle;
  jobInput.value = textProfileText;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let valuePopupName = nameInput.value;
  let valuePopupText = jobInput.value;

  valueProfileTitle.textContent = valuePopupName;
  valueProfileText.textContent= valuePopupText;

  closePopup();
}

profileEditPopupButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

// popup.addEventListener('click', function(event) {
//   if(event.target === event.currentTarget) {
//     event.stopPropagation();
//     closePopup();
//   }
// });

formElement.addEventListener('submit', formSubmitHandler);
