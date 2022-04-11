import {config, profileEditPopupButton, profileAddCardsButton, profileEditAvatarPopupButton} from '../utils/constants.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidation.js';
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithFormInfo} from '../components/PopupWithFormInfo.js'
import {Card} from '../components/Card.js';
import {UserInfo} from '../components/UserInfo.js';
import {api} from '../components/Api.js';

import './index.css';

Promise.all([api.getInfoUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfoProfile.setUserInfo(userData);
    userInfoProfile.setUserAvatar(userData);
    cardsList.renderItems(cards, userData);
  })

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile () {
  formValidators['profile-form'].resetValidation();
  const userInfo = userInfoProfile.getUserInfo();
  valuePopupProfile.setInputValues(userInfo);
  valuePopupProfile.open();
}

// Функция открытия попапа для редактирования аватара
function openPopupEditProfileAvatar () {
  formValidators['avatar-form'].resetValidation();
  const userInfo = userInfoProfile.getUserAvatar();
  valuePopupProfileAvatar.setInputValues(userInfo);
  valuePopupProfileAvatar.open();
}

// Функция изменения имени и текста
function handleProfileFormSubmit (data) {
  valuePopupProfile.loading('Сохранение...');
  userInfoProfile.setUserInfo(data);
  api.setInfoUser(data)
    .then(() => {
      valuePopupProfile.close();
    })
    .catch((res) => console.log(res))
    .finally(() => {
      valuePopupProfile.loading('Сохранить');
    })
}

// Функция изменения аватара
function handleProfileAvatarFormSubmit (data) {
  valuePopupProfileAvatar.loading('Сохранение...');
  userInfoProfile.setUserAvatar(data);
  api.setAvatarUser(data)
    .then(() => {
      valuePopupProfileAvatar.close();
    })
    .catch((res) => console.log(res))
    .finally(() => {
      valuePopupProfileAvatar.loading('Сохранить');
    })
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards () {
  valuePopupCard.open();
  formValidators['card-form'].resetValidation();
}

// Функция добавления карточки
function handleCardFormSubmit (data) {
  valuePopupCard.loading('Сохранение...');
  Promise.all([api.getInfoUser(), api.setCard(data)])
    .then(([userData, card]) => {
      cardsList.addNewItem(createCard(card, userData));
      valuePopupCard.close();
    })
    .catch((res) => console.log(res))
    .finally(() => {
      valuePopupCard.loading('Сохранить');
    })
}

// Функция клика по карточке
const handleCardClick = (name, link) => {
  openPopup.open(name, link);
}

//Навешиваем обработчики
profileEditPopupButton.addEventListener('click', openPopupEditProfile);
profileAddCardsButton.addEventListener('click', openPopupAddCards);
profileEditAvatarPopupButton.addEventListener('click', openPopupEditProfileAvatar);

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

// Создаем класс PopupWithImage для открытия диалогового Popup c вопросом удаления карточки
const deletePopup = new PopupWithFormInfo('popup_delete-card');
deletePopup.setEventListeners();

// Создаем класс PopupWithForm в которой собираем все input по открытой форме для создания карточки
const valuePopupCard = new PopupWithForm('popup_add-card', handleCardFormSubmit);
valuePopupCard.setEventListeners();

// Создаем класс PopupWithForm в которой собираем все input по открытой форме
const valuePopupProfile = new PopupWithForm('popup_edit-profile', handleProfileFormSubmit);
valuePopupProfile.setEventListeners();

// Создаем класс PopupWithForm в которой собираем все input по открытой форме
const valuePopupProfileAvatar = new PopupWithForm('popup_edit-avatar', handleProfileAvatarFormSubmit);
valuePopupProfileAvatar.setEventListeners();

// Создаем класс UserInfo
const userInfoProfile = new UserInfo({
  profileTitle: '.profile__title',
  profileText: '.profile__text',
  profileAvatar: '.profile__avatar'
});

// Функция создания класса Card
function createCard(data, userData) {
  const newCard = new Card(
    data,
    userData,
    '#card',
    handleCardClick,
    {
      handlePopupDeleteCard: (id) => {
          deletePopup.open();
          deletePopup.handlerSubmitBtnDelete(() => {
            api.deleteCard(id)
              .then((res) => {
                newCard.deleteCard();
                deletePopup.close();
              })
              .catch((res) => console.log(res))
          });
        },

      handleLikeCard: (id) => {
          if (newCard.searchLike()) {
            api.deleteLikes(id)
            .then((res) => {
              newCard.setLikes(res.likes);
              console.log('убрали лайк');
            })
            .catch((res) => console.log(res))
          } else {
            api.setLikes(id)
            .then((res) => {
              newCard.setLikes(res.likes);
              console.log('поставили лайк');
            })
            .catch((res) => console.log(res))

          }
        }
    }
  );
  const card = newCard.generateCard();
  return card;
}

// Создаем класс Section, с помощью которого рендерим все наши карточки на страничке
const cardsList = new Section({
  renderer: (data, userData) => {
      const cardElement = createCard(data, userData);
      cardsList.addItem(cardElement);
    }
  },
  'cards'
);
