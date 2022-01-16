let profileEditPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__text');

profileEditPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
  if(event.target === event.currentTarget) {
    closePopup();
  }
});

function openPopup (event) {
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let valuePopupName = nameInput.value;
  let valuePopupText = jobInput.value;
  let valueProfileTitle = document.querySelector('.profile__title');
  let valueProfileText = document.querySelector('.profile__text');

  console.log(valuePopupName);
  console.log(valuePopupText);
  console.log(valueProfileTitle);
  console.log(valueProfileText);

  valueProfileTitle.textContent = valuePopupName;
  valueProfileText.textContent= valuePopupText;

  console.log(valueProfileTitle);
  console.log(valueProfileText);
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
