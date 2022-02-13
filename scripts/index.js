const cards = document.querySelector('.cards');
const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupOpenCard = document.querySelector('.popup_card-open');
const valueCardName = popupAddCard.querySelector('.popup__input_string-name')
const valueCardText = popupAddCard.querySelector('.popup__input_string-text')
const headerPopupCard = popupOpenCard.querySelector('.popup__header');
const templateCard = document.querySelector('#card').content;
const valueProfileNamePopup = popupEditProfile.querySelector('.popup__input_string-name');
const valueProfileTextPopup = popupEditProfile.querySelector('.popup__input_string-text');
const itemCard = popupOpenCard.querySelector('.popup__image');
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

//Функция клонирования шаблона для создания карточки
function createCard (item) {
  const cardElement = templateCard.querySelector('.cards__item').cloneNode(true);

  const imageCard = cardElement.querySelector('.cards__image');
    imageCard.setAttribute('src', `${item.link}`);
    imageCard.setAttribute('alt', `${item.name}`);

  const headerCardText = cardElement.querySelector('.cards__text');
    headerCardText.textContent = `${item.name}`;

  const deleteCardButton = cardElement.querySelector('.cards__button-delete');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeCardButton = cardElement.querySelector('.cards__button');
  likeCardButton.addEventListener('click', likeCard);

  imageCard.addEventListener('click', () => openCard(item));
  return cardElement;
}

// Функция создания карточек из массива
function addCard(item) {
  const card = createCard(item);
  cards.prepend(card);
}

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile () {
  valueProfileNamePopup.setAttribute('value', `${valueProfileTitle.textContent}`);
  valueProfileTextPopup.setAttribute('value', `${valueProfileText.textContent}`);
  openPopup(popupEditProfile);
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards () {
  openPopup(popupAddCard);
}

// Функция открытия карточки
function openCard (item) {
  const imgCard = `${item.link}`;
  const headerCard = `${item.name}`;

  itemCard.setAttribute('src' , `${imgCard}`);
  itemCard.setAttribute('alt' , `${headerCard}`);
  headerPopupCard.textContent = `${headerCard}`;

  openPopup(popupOpenCard);
}

//Функция открытия попапов
function openPopup (popup) {

  //Функцию валидации запускаю при открытии попапа, т.к. если запустить ее из файла Validate.js, происходит баг,
  //а именно при открытии Popup для редактирования профиля, валидор проверяет пустные значения input и кнопка submit не активна
  //затем происходит открытие самого popup, в который вставляются значения со странички,
  //а если запустить функция валидации при открытии попапа, когда уже выбраны значения для input, кнопка submit принимает корректное положение.

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });

  // Функция открытия попапа
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
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

  valueCardName.value = '';
  valueCardText.value = '';

  addCard(cardItem);
  closePopup(popupAddCard);
}

// Функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.cards__item').remove();
}

// Функция лайка карточки
function likeCard (evt) {
  evt.target.classList.toggle('cards__button_liked');
}

// Навешивает событие на popup для зыкрытия по клавище Esc
document.querySelector('.page').addEventListener('keydown', (evt) => {
  if(evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup (popup);
  }
});

// Навешивает событие на popupEditProfile для зыкрытия по клику на оверлей
popupEditProfile.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup (popupEditProfile);
  }
});

// Навешивает событие на popupAddCard для зыкрытия по клику на оверлей
popupAddCard.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup (popupAddCard);
  }
});

// Навешивает событие на popupOpenCard для зыкрытия по клику на оверлей
popupOpenCard.addEventListener('click', (evt) => {
  if(evt.target === evt.currentTarget) {
    closePopup (popupOpenCard);
  }
});

// Обработчики событий
popupEditProfile.querySelector('.popup__close').addEventListener('click', () => { closePopup(popupEditProfile); });
popupEditProfile.querySelector('.popup__form_edit-profile').addEventListener('submit', handleProfileFormSubmit);

popupAddCard.querySelector('.popup__close').addEventListener('click', () => { closePopup(popupAddCard); });
popupAddCard.querySelector('.popup__form_add-card').addEventListener('submit', handleCardFormSubmit);

popupOpenCard.querySelector('.popup__close').addEventListener('click', () => { closePopup(popupOpenCard); });

profileEditPopupButton.addEventListener('click', openPopupEditProfile);
profileAddCardsButton.addEventListener('click', openPopupAddCards);

// создания карточек
initialCards.forEach(item => addCard(item));
