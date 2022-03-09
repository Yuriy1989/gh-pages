const cards = document.querySelector('.cards');
const profileEditPopupButton = document.querySelector('.profile__edit-button');
const profileAddCardsButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupSubmit = popupAddCard.querySelector('.popup__button');
const popupOpenCard = document.querySelector('.popup_card-open');
const valueCardName = popupAddCard.querySelector('.popup__input_string-name');
const valueCardText = popupAddCard.querySelector('.popup__input_string-text');
const headerPopupCard = popupOpenCard.querySelector('.popup__header');
const templateCard = document.querySelector('#card').content;
const valueProfileNamePopup = popupEditProfile.querySelector('.popup__input_string-name');
const valueProfileTextPopup = popupEditProfile.querySelector('.popup__input_string-text');
const itemCard = popupOpenCard.querySelector('.popup__image');
const valueProfileTitle = document.querySelector('.profile__title');
const valueProfileText = document.querySelector('.profile__text');
const popups = document.querySelectorAll('.popup');

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

//Класс карточек
class Card {
  constructor (data, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;
  }

//Метод получения разметки шаблона карточки
  _getTamplate() {
    const cardElement = templateCard.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

//Метод добавляющий слушателя для удаления карточки
  _setEventDeleteCard() {
    this._element.querySelector('.cards__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });
  }

//Метод добавляющий слушателя для удаления карточки
  _setEventLikeCard() {
    this._element.querySelector('.cards__button').addEventListener('click', () => {
      this._likeCard();
    });
  }

//Метод добавляющий слушателя для открытия карточки
  _setEventOpenCard() {
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._openCard();
    });
  }

//Метод добавляющий слушателя для открытия Popup добавляющего карточки
  _setEventPopupAddCard() {
    profileAddCardsButton.addEventListener('click', () => {
      this._openPopupAddCard();
    });
  }

//Метод добавляющий слушателя для добавления карточки
  // _setEventAddCard() {
  //   popupAddCard.querySelector('.popup__form_add-card').addEventListener('submit', (evt) => {
  //     console.log(evt);
  //     evt.preventDefault();
  //     this._addCard();
  //   });
  // }

//Метод открытия карточки
  _openCard() {
    itemCard.src = this._link;
    itemCard.alt = this._name;
    headerPopupCard.textContent = this._name;
    openPopup(popupOpenCard);
  }

//Метод лайка карточки
  _likeCard() {
    this._element.querySelector('.cards__button').classList.toggle('cards__button_liked');
  }

//Метод удаления карточки
  _deleteCard() {
    this._element.remove();
  }

//Метод открытия попапа для добавления карточки
  _openPopupAddCard() {
    openPopup(popupAddCard);
  }

//Метод добавления карточки
  // _addCard(evt) {
  //   // console.log('addCard');
  //   // console.log(this);
  //   // console.log(evt);
  //   const valueCardTitle =  valueCardName.value;
  //   const valueCardLink = valueCardText.value;

  //   const cardItem = {
  //     name : `${valueCardTitle}`,
  //     link: `${valueCardLink}`
  //   };

  //   valueCardName.value = '';
  //   valueCardText.value = '';

  //   popupSubmit.setAttribute('disabled', '');
  //   popupSubmit.classList.add('popup__button_disabled');

  //   console.log(cardItem);
  //   this.generateCard(cardItem);
  //   closePopup(popupAddCard);
  // }

//Метод генерации заполненной карточки
  generateCard() {
    this._element = this._getTamplate();
    this._setEventDeleteCard();
    this._setEventLikeCard();
    this._setEventOpenCard();
    this._element.querySelector('.cards__image').src = this._link;
    this._element.querySelector('.cards__image').alt = this._name;
    this._element.querySelector('.cards__text').textContent = this._name;
    return this._element;
  }
}

//Функция клонирования шаблона для создания карточки
// function createCard (item) {
  // const cardElement = templateCard.querySelector('.cards__item').cloneNode(true);

  // const imageCard = cardElement.querySelector('.cards__image');
  //   imageCard.setAttribute('src', `${item.link}`);
  //   imageCard.setAttribute('alt', `${item.name}`);

  // const headerCardText = cardElement.querySelector('.cards__text');
  //   headerCardText.textContent = `${item.name}`;

  // const deleteCardButton = cardElement.querySelector('.cards__button-delete');
  // deleteCardButton.addEventListener('click', deleteCard);

  // const likeCardButton = cardElement.querySelector('.cards__button');
  // likeCardButton.addEventListener('click', likeCard);

  // imageCard.addEventListener('click', () => openCard(item));
  // return cardElement;
// }

// Функция создания карточек из массива
// function addCard(item) {
//   const card = createCard(item);
//   cards.prepend(card);
// }

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
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
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

  popupSubmit.setAttribute('disabled', '');
  popupSubmit.classList.add('popup__button_disabled');

  const card = new Card(cardItem);
  const cardElement = card.generateCard();
  render(cardElement);
  closePopup(popupAddCard);
}

// Функция удаления карточки
// function deleteCard (evt) {
//   evt.target.closest('.cards__item').remove();
// }

// Функция лайка карточки
// function likeCard (evt) {
//   evt.target.classList.toggle('cards__button_liked');
// }

// Навешивает событие на popup для зыкрытия по клавище Esc
function closeByEscape(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
}

// Функция рендера карточек
function render (cardElements) {
  cards.prepend(cardElements);
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

// создания карточек
// initialCards.forEach(item => addCard(item));

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElements = card.generateCard();
  render(cardElements);
});

