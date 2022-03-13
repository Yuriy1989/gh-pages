import {popupOpenCard, openPopup, closePopup, itemCard, headerPopupCard} from './utils.js';
import {FormValidator} from './FormValidation.js';
import {Card} from './Card.js';

const cards = document.querySelector('.cards');
const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupSubmit = popupAddCard.querySelector('.popup__button');
const valueCardName = popupAddCard.querySelector('.popup__input_string-name');
const valueCardText = popupAddCard.querySelector('.popup__input_string-text');
const valueProfileNamePopup = popupEditProfile.querySelector('.popup__input_string-name');
const valueProfileTextPopup = popupEditProfile.querySelector('.popup__input_string-text');
const valueProfileTitle = document.querySelector('.profile__title');
const valueProfileText = document.querySelector('.profile__text');
const popups = document.querySelectorAll('.popup');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const initialCards = [
  {
    name: 'Салоники - город на побережье залива Термаикос',
    link: 'https://images.unsplash.com/photo-1630391886685-b3ef8d10de53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  },
  {
    name: 'Таймс-сквер, Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1642873744568-a7c5f7d10aae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  },
  {
    name: 'Атрани, Италия',
    link: 'https://images.unsplash.com/photo-1576875356666-988d2a13651c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  },
  {
    name: 'Санкт-Антон-ам-Арльберг, Австрия',
    link: 'https://images.unsplash.com/photo-1642712005967-a27db48c3bed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  },
  {
    name: 'Мост Золотые Ворота, Сан-Франциско',
    link: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  },
  {
    name: 'Колизей или амфитеатр Флавиев, Рим',
    link: 'https://images.unsplash.com/photo-1569343051392-7cf0a301baa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  }
];

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

// Создание экземляров класса FormValidator
enableValidation(config);

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile () {
  valueProfileNamePopup.setAttribute('value', `${valueProfileTitle.textContent}`);
  valueProfileTextPopup.setAttribute('value', `${valueProfileText.textContent}`);

  openPopup(popupEditProfile);
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards () {
  formValidators['card-form'].resetValidation()
  openPopup(popupAddCard);
}

// Функция изменения имени и текста
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  valueProfileTitle.textContent = valueProfileNamePopup.value;
  valueProfileText.textContent = valueProfileTextPopup.value;
  closePopup(popupEditProfile);
}

// Функция добавления карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const valueCardTitle =  valueCardName.value;
  const valueCardLink = valueCardText.value;

  const cardItem = {
    name : `${valueCardTitle}`,
    link: `${valueCardLink}`
  };

  const cardElement = createCard(cardItem);
  render(cardElement);
  closePopup(popupAddCard);
}

// Функция рендера карточек
function render (cardElements) {
  cards.prepend(cardElements);
}

// Функция клика по карточке
const handleCardClick = (name, link) => {
  itemCard.src = link;
  itemCard.alt = name;
  headerPopupCard.textContent = name;

  openPopup(popupOpenCard);
}

// Функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Обработчики событий
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-image')) {
        closePopup(popup)
      }
    })
})

popupEditProfile.querySelector('.popup__form_edit-profile').addEventListener('submit', handleProfileFormSubmit);
popupAddCard.querySelector('.popup__form_add-card').addEventListener('submit', handleCardFormSubmit);

profileEditPopupButton.addEventListener('click', openPopupEditProfile);
profileAddCardsButton.addEventListener('click', openPopupAddCards);

initialCards.forEach((cardItem) => {
  const cardElements = createCard(cardItem);
  render(cardElements);
});


