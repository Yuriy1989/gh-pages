const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const templatePopup = document.querySelector('#popup').content;
const templateCard = document.querySelector('#card').content;
const templateOpenCard = document.querySelector('#image-open-popup').content;
const page = document.querySelector('.page');

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

// Функция создания секции карточек
function addSectionCards () {
  const sectionProfile = document.querySelector('.profile');

  const sectionElements = document.createElement('section');
    sectionElements.classList.add('elements');

  const ulElements = document.createElement('ul');
    ulElements.classList.add('cards');

  sectionElements.append(ulElements);
  sectionProfile.after(sectionElements);
}

// Функция создания карточек из массива
function addCard(item) {
  const card = templateCard.querySelector('.cards__item').cloneNode(true);
  const cards = document.querySelector('.cards');
  cards.prepend(card);

  const imageCard = document.querySelector('.cards__image');
    imageCard.setAttribute('src', `${item.link}`);
    imageCard.setAttribute('alt', `${item.name}`);

  const headerCardText = document.querySelector('.cards__text');
    headerCardText.textContent = `${item.name}`;

  const deleteCardButton = document.querySelector('.cards__button-delete');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeCardButton = document.querySelector('.cards__button');
  likeCardButton.addEventListener('click', likeCard);

  const openImageCard = document.querySelector('.cards__image');
  openImageCard.addEventListener('click', openCard);
}

// Функция открытия попапа
function openPopup (event) {
  popup.classList.add('popup_opened');
  let textProfileTitle = valueProfileTitle.textContent;
  let textProfileText = valueProfileText.textContent;
  nameInput.value = textProfileTitle;
  jobInput.value = textProfileText;
}

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile (event) {
  event.preventDefault();
  const userEditPopup = templatePopup.querySelector('.popup').cloneNode(true);
  userEditPopup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  userEditPopup.querySelector('.popup__button').value = 'Сохранить';
  userEditPopup.classList.add('popup_opened');

  let valueProfileTitle = document.querySelector('.profile__title').textContent;
  let valueProfileText = document.querySelector('.profile__text').textContent;
  page.append(userEditPopup);

  const popupInputStringName = document.createElement('input');
    popupInputStringName.setAttribute('type', 'text');
    popupInputStringName.setAttribute('name', 'name');
    popupInputStringName.setAttribute('autocomplete', 'off');
    popupInputStringName.setAttribute('value', `${valueProfileTitle}`);
    popupInputStringName.classList.add('popup__input', 'popup__input_string_name');

  const popupInputStringText = document.createElement('input');
    popupInputStringText.setAttribute('type', 'text');
    popupInputStringText.setAttribute('name', 'text');
    popupInputStringText.setAttribute('autocomplete', 'off');
    popupInputStringText.setAttribute('value', `${valueProfileText}`);
    popupInputStringText.classList.add('popup__input', 'popup__input_string_text');

  const headerPopup = document.querySelector('.popup__title');
  headerPopup.after(popupInputStringName);
  popupInputStringName.after(popupInputStringText);

  userEditPopup.querySelector('.popup__close').addEventListener('click', closePopup);
  userEditPopup.querySelector('.popup__form').addEventListener('submit', formSubmitHandler);
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards (evt) {
  evt.preventDefault();
  const addCardPopup = templatePopup.querySelector('.popup').cloneNode(true);

  addCardPopup.querySelector('.popup__title').textContent = 'Новое место';
  addCardPopup.querySelector('.popup__button').value = 'Создать';
  addCardPopup.classList.add('popup_opened');

  page.append(addCardPopup);

  const popupInputStringNameCard = document.createElement('input');
    popupInputStringNameCard.setAttribute('type', 'text');
    popupInputStringNameCard.setAttribute('name', 'name');
    popupInputStringNameCard.setAttribute('autocomplete', 'off');
    popupInputStringNameCard.setAttribute('placeholder', 'Название');
    popupInputStringNameCard.classList.add('popup__input', 'popup__input_string_name');

  const popupInputStringLink = document.createElement('input');
    popupInputStringLink.setAttribute('type', 'text');
    popupInputStringLink.setAttribute('name', 'text');
    popupInputStringLink.setAttribute('autocomplete', 'off');
    popupInputStringLink.setAttribute('placeholder', 'Ссылка на картинку');
    popupInputStringLink.classList.add('popup__input', 'popup__input_string_text');

  const headerPopup = document.querySelector('.popup__title');
  headerPopup.after(popupInputStringNameCard);
  popupInputStringNameCard.after(popupInputStringLink);

  addCardPopup.querySelector('.popup__close').addEventListener('click', closePopup);
  addCardPopup.querySelector('.popup__form').addEventListener('submit', addCardformSubmitHandler);
}

// Функция закрытия попапа
function closePopup () {
  const popup = document.querySelector('.popup');
  popup.remove();
}

// Функция изменения имени и текста
function formSubmitHandler (evt) {
  let valueProfileTitle = document.querySelector('.profile__title');
  let valueProfileText = document.querySelector('.profile__text');

  valueProfileTitle.textContent = document.querySelector('.popup__input_string_name').value;
  valueProfileText.textContent = document.querySelector('.popup__input_string_text').value;

  closePopup();
}

// Функция добавления карточки
function addCardformSubmitHandler (evt) {
  let valueProfileTitle =  document.querySelector('.popup__input_string_name').value;;
  let valueProfileText = document.querySelector('.popup__input_string_text').value;

  console.log(valueProfileTitle);

  let addCardItem = {
    name : `${valueProfileTitle}`,
    link: `${valueProfileText}`
  };

  addCard(addCardItem);
  closePopup();
}

// Функция открытия карточки
function openCard (evt) {
  evt.preventDefault();

  let imgCard = evt.target.getAttribute('src');
  let headerCard = evt.target.getAttribute('alt');

  const openCardPopup = templateOpenCard.querySelector('.popup').cloneNode(true);
  const itemCard = openCardPopup.querySelector('.popup__image');
  itemCard.setAttribute('src' , `${imgCard}`);
  let popupHeader = openCardPopup.querySelector('.popup__header').textContent = `${headerCard}`;

  page.append(openCardPopup);

  openCardPopup.querySelector('.popup__close').addEventListener('click', closePopup);
}

// Функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.cards__item').remove();
}

// Функция лайка карточки
function likeCard (evt) {
  let imgLikeCard = evt.target.getAttribute('src');
  if (imgLikeCard == 'images/heart.svg') {
    evt.target.setAttribute('src', 'images/Union.svg');
  } else {
    evt.target.setAttribute('src', 'images/heart.svg');
  }
}

// Обработчики событий
profileEditPopupButton.addEventListener('click', openPopupEditProfile);
profileAddCardsButton.addEventListener('click', openPopupAddCards);

// создания секции карточек
addSectionCards();

// создания карточек
initialCards.forEach(item => addCard(item));
