import {config, cards, profileEditPopupButton, profileAddCardsButton,
  valueProfileNamePopup, valueProfileTextPopup, initialCards} from '../utils/constants.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidation.js';
import {PopupWithForm} from '../components/PopupWithForm.js'
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';

import './index.css';

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile () {
  const userInfo = userInfoProfile.getUserInfo();

  valueProfileNamePopup.setAttribute('value', userInfo.yourName);
  valueProfileTextPopup.setAttribute('value', userInfo.text);
  valuePopupProfile.open();
}

// Функция изменения имени и текста
function handleProfileFormSubmit (newUserInfo) {
  userInfoProfile.setUserInfo(newUserInfo);
  valuePopupProfile.close();
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards () {
  valuePopupCard.open();
  formValidators['card-form'].resetValidation();
}

// Функция добавления карточки
function handleCardFormSubmit (cardItem) {
  cardsList.addItem(createCard(cardItem));
  valuePopupCard.close();
}

// Функция создания класса Card
function createCard(item) {
  const newCard = new Card(item, '#card', handleCardClick);
  const card = newCard.generateCard();
  return card;
}

// Функция клика по карточке
const handleCardClick = (name, link) => {
  openPopup.open(name, link);
}

//Навешиваем обработчики
profileEditPopupButton.addEventListener('click', openPopupEditProfile);
profileAddCardsButton.addEventListener('click', openPopupAddCards);

// Создаем класс FormValidator
export const formValidators = {}; // в данную константу сохраняем класс FormValidator для каждой формы
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

// Создаем класс PopupWithImage
const openPopup = new PopupWithImage('popup_card-open');
openPopup.setEventListeners();

// Создаем класс PopupWithForm в которой собираем все input по открытой форме
const valuePopupCard = new PopupWithForm('popup_add-card', handleCardFormSubmit);
valuePopupCard.setEventListeners();

// Создаем класс PopupWithForm в которой собираем все input по открытой форме
const valuePopupProfile = new PopupWithForm('popup_edit-profile', handleProfileFormSubmit);
valuePopupProfile.setEventListeners();

// Создаем класс UserInfo
const userInfoProfile = new UserInfo({
  profileTitle: '.profile__title',
  profileText: '.profile__text'
});

// Создаем класс Section, с помощью которого рендерим все наши карточки на страничке
const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
  'cards'
);

cardsList.renderItems();



