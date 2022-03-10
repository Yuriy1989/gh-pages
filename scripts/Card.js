import {headerPopupCard, itemCard, popupOpenCard, openPopup} from './utils.js';

//Класс карточек
export class Card {
  constructor (data, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = document.querySelector(template).content;
  }

//Метод получения разметки шаблона карточки
  _getTamplate() {
    const cardElement = this._template.querySelector('.cards__item').cloneNode(true);
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
