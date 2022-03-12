import {headerPopupCard, itemCard, popupOpenCard, openPopup} from './utils.js';

//Класс карточек
export class Card {
  constructor (data, template, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._template = document.querySelector(template).content;
    this._handleCardClick = handleCardClick;
  }

//Метод получения разметки шаблона карточки
  _getTamplate() {
    const cardElement = this._template.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

//Метод навешивания событий
  _setEventListeners() {
    this._cardsbutton = this._element.querySelector('.cards__button');
    this._cards__image = this._element.querySelector('.cards__image');
    this._setEventDeleteCard();
    this._setEventLikeCard();
    this._cards__image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

//Метод добавляющий слушателя для удаления карточки
  _setEventDeleteCard() {
    this._element.querySelector('.cards__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });
  }

//Метод добавляющий слушателя для удаления карточки
  _setEventLikeCard() {
    this._cardsbutton.addEventListener('click', () => {
      this._likeCard();
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
    this._cardsbutton.classList.toggle('cards__button_liked');
  }

//Метод удаления карточки
  _deleteCard() {
    this._element.remove();
  }

//Метод генерации заполненной карточки
  generateCard() {
    this._element = this._getTamplate();
    this._setEventListeners();
    this._cards__image.src = this._link;
    this._cards__image.alt = this._name;
    this._element.querySelector('.cards__text').textContent = this._name;

    return this._element;
  }
}
