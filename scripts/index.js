const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupOpenCard = document.querySelector('.popup_card-open');
const templateCard = document.querySelector('#card').content;
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

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile () {
  popupEditProfile.querySelector('.popup__form').classList.add('popup__form-edit-profile');
  popupEditProfile.classList.add('popup__opened');

  let valueProfileTitle = document.querySelector('.profile__title').textContent;
  let valueProfileText = document.querySelector('.profile__text').textContent;
  let valueProfileNamePopup = popupEditProfile.querySelector('.popup__input_string_name');
  let valueProfileTextPopup = popupEditProfile.querySelector('.popup__input_string_text');

  valueProfileNamePopup.setAttribute('value', `${valueProfileTitle}`);
  valueProfileTextPopup.setAttribute('value', `${valueProfileText}`);

  popupEditProfile.querySelector('.popup__close').addEventListener('click', closePopup);
  popupEditProfile.querySelector('.popup__form-edit-profile').addEventListener('submit', formSubmitHandler);
}

// Функция открытия попапа для добавления карточек
function openPopupAddCards (evt) {
  let valueProfileNamePopup = popupAddCard.querySelector('.popup__input_string_name');
  let valueProfileTextPopup = popupAddCard.querySelector('.popup__input_string_text');
  valueProfileNamePopup.setAttribute('value', '');
  valueProfileTextPopup.setAttribute('value', '');

  popupAddCard.querySelector('.popup__form').classList.add('popup__form-add-card');
  popupAddCard.classList.add('popup__opened');

  popupAddCard.querySelector('.popup__close').addEventListener('click', closePopup);
  popupAddCard.querySelector('.popup__form-add-card').addEventListener('submit', addCardformSubmitHandler);
}

// Функция закрытия попапа
function closePopup (evt) {
  console.log('closePopup');
  if (evt.target.closest('.popup').classList.contains('popup_edit-profile')) {
    const popup = document.querySelector('.popup_edit-profile');
    popup.classList.toggle("popup__opened");
    console.log('close Profile Cards');
  } else if (evt.target.closest('.popup').classList.contains('popup_add-card')) {
    const popup = document.querySelector('.popup_add-card');
    popup.classList.toggle("popup__opened");
  } else {
    const popup = document.querySelector('.popup_card-open');
    popup.classList.toggle("popup__opened");
  }
}

// Функция изменения имени и текста
function formSubmitHandler (evt) {
  evt.preventDefault();
  let valueProfileTitle = document.querySelector('.profile__title');
  let valueProfileText = document.querySelector('.profile__text');

  valueProfileTitle.textContent = popupEditProfile.querySelector('.popup__input_string_name').value;
  valueProfileText.textContent = popupEditProfile.querySelector('.popup__input_string_text').value;
  closePopup(evt);
}

// Функция добавления карточки
function addCardformSubmitHandler (evt) {
  evt.preventDefault();
  let valueProfileTitle =  popupAddCard.querySelector('.popup__input_string_name').value;
  let valueProfileText = popupAddCard.querySelector('.popup__input_string_text').value;

  let addCardItem = {
    name : `${valueProfileTitle}`,
    link: `${valueProfileText}`
  };

  popupAddCard.querySelector('.popup__input_string_name').value = '';
  popupAddCard.querySelector('.popup__input_string_text').value = '';

  addCard(addCardItem);
  closePopup(evt);
}

// Функция открытия карточки
function openCard (evt) {
  let imgCard = evt.target.getAttribute('src');
  let headerCard = evt.target.getAttribute('alt');

  const itemCard = popupOpenCard.querySelector('.popup__image');
  itemCard.setAttribute('src' , `${imgCard}`);
  let popupHeader = popupOpenCard.querySelector('.popup__header').textContent = `${headerCard}`;

  popupOpenCard.classList.add('popup__opened');

  popupOpenCard.querySelector('.popup__close').addEventListener('click', closePopup);
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
