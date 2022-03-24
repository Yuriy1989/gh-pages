import {popupOpenCard, config, headerPopupCard, itemCard} from './utils.js';
import Section from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {FormValidator} from './FormValidation.js';
import {Card} from './Card.js';

const cards = document.querySelector('.cards');
const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const valueCardName = popupAddCard.querySelector('.popup__input_string-name');
const valueCardText = popupAddCard.querySelector('.popup__input_string-text');
const valueProfileNamePopup = popupEditProfile.querySelector('.popup__input_string-name');
const valueProfileTextPopup = popupEditProfile.querySelector('.popup__input_string-text');
const valueProfileTitle = document.querySelector('.profile__title');
const valueProfileText = document.querySelector('.profile__text');

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

  const openPopup = new Popup(popupEditProfile);
  openPopup.open();
  openPopup.setEventListeners();
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards () {
  const openPopup = new Popup(popupAddCard);
  openPopup.open();
  openPopup.setEventListeners();
}

// Функция изменения имени и текста
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  valueProfileTitle.textContent = valueProfileNamePopup.value;
  valueProfileText.textContent = valueProfileTextPopup.value;
}

// Функция добавления карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const valueCardTitle =  valueCardName.value;
  const valueCardLink = valueCardText.value;

  const cardItem = [{
    name : `${valueCardTitle}`,
    link: `${valueCardLink}`
  }];

  const cardsList = new Section({
    data: cardItem,
    renderer: (item) => {
      const card = new Card(item, '#card', handleCardClick);
      const cardElement = card.generateCard();

        cardsList.addItem(cardElement);
      }
    },
    cards
  );
  cardsList.renderItems();
}

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
// enableValidation(config);



const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', handleCardClick);
    const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    }
  },
  cards
);

cardsList.renderItems();



