import {popupOpenCard, config, popupAddCard, headerPopupCard, itemCard} from './utils.js';
import Section from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {FormValidator} from './FormValidation.js';
import {PopupWithForm} from './PopupWithForm.js'
import {Card} from './Card.js';

const cards = document.querySelector('.cards');
const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');

const valueCardName = popupAddCard.querySelector('.popup__input_string-name');
const valueCardText = popupAddCard.querySelector('.popup__input_string-text');
const valueProfileNamePopup = popupEditProfile.querySelector('.popup__input_string-name');
const valueProfileTextPopup = popupEditProfile.querySelector('.popup__input_string-text');
const valueProfileTitle = document.querySelector('.profile__title');
const valueProfileText = document.querySelector('.profile__text');

let popup;

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

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile () {
  valueProfileNamePopup.setAttribute('value', `${valueProfileTitle.textContent}`);
  valueProfileTextPopup.setAttribute('value', `${valueProfileText.textContent}`);

  itemPopup(popupEditProfile);
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards () {
  itemPopup(popupAddCard);
}

//Функция создания класса Popup
function itemPopup (namePopup) {
  popup = new Popup(namePopup);
  popup.open();
  popup.setEventListeners();
  return popup;
}

// Функция изменения имени и текста
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  valueProfileTitle.textContent = valueProfileNamePopup.value;
  valueProfileText.textContent = valueProfileTextPopup.value;
}

// Функция добавления карточки
function handleCardFormSubmit (cardItem) {
  formValidators['card-form'].resetValidation()
  console.log(cardItem);

  cardsList.addItem(createCard(cardItem));
  popup.close();
}


const valuePopup = new PopupWithForm(popupAddCard, handleCardFormSubmit);
valuePopup.setEventListeners();



// Функция клика по карточке
const handleCardClick = (name, link) => {
  const openPopup = new PopupWithImage(popupOpenCard, name, link);

  openPopup.open();
  openPopup.setEventListeners();
}

popupEditProfile.querySelector('.popup__form_edit-profile').addEventListener('submit', handleProfileFormSubmit);
// popupAddCard.querySelector('.popup__form_add-card').addEventListener('submit', handleCardFormSubmit);

profileEditPopupButton.addEventListener('click', openPopupEditProfile);
profileAddCardsButton.addEventListener('click', openPopupAddCards);


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
enableValidation(config);

function createCard(item) {
  const newCard = new Card(item, '#card', handleCardClick);
  const card = newCard.generateCard();
  return card;
}

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
  cards
);

cardsList.renderItems();



