//Класс карточек
export class Card {
  constructor (data, userData, template, handleCardClick, {handlePopupDeleteCard, handleLikeCard}) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id_user = userData._id;
    this._id_user_card = data.owner._id;
    this._id_card = data._id;
    this._template = document.querySelector(template).content;
    this._handleCardClick = handleCardClick;
    this._handlePopupDeleteCard = handlePopupDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

//Метод получения разметки шаблона карточки
  _getTamplate() {
    const cardElement = this._template.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

//Метод навешивания событий
  _setEventListeners() {
    this._cardLikeBtn = this._element.querySelector('.cards__button');
    this._cardOpenImage = this._element.querySelector('.cards__image');
    this._setEventDeleteCard();
    this._setEventLikeCard();
    this._cardOpenImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

//Метод добавляющий слушателя для удаления карточки
  _setEventDeleteCard() {
    this._cardDeleteBtn = this._element.querySelector('.cards__button-delete');
    this._cardDeleteBtn.addEventListener('click', () => {
      this._handlePopupDeleteCard(this._id_card);
    });
  }

//Метод добавляющий слушателя для удаления карточки
  _setEventLikeCard() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._handleLikeCard(this._id_card);
    });
  }

//Проверяем лайкали ли мы данную карточку ранее
  searchLike() {
    return this._likes.find((item) => item._id === this._id_user);
  }

//Рендерим иконки и статистику по лайкам
  setLikes(card) {
    this._likes = card;
    this._element.querySelector('.cards__amount-like').textContent = this._likes.length;
    if(this.searchLike()) {
      this._cardLikeBtn.classList.add('cards__button_liked');
    } else {
      this._cardLikeBtn.classList.remove('cards__button_liked');
    }
  }

//Метод удаления карточки
  deleteCard() {
    this._element.remove();
  }

//Метод генерации заполненной карточки
  generateCard() {
    this._element = this._getTamplate();
    this._setEventListeners();
    this._cardOpenImage.src = this._link;
    this._cardOpenImage.alt = this._name;
    this._element.querySelector('.cards__text').textContent = this._name;
    this.setLikes(this._likes)
    if(this._id_user_card === this._id_user) {
      this._cardDeleteBtn.style.display = 'inline';
    }
    return this._element;
  }
}




