import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._cardLink = this._popup.querySelector('.popup__image');
    this._cardName = this._popup.querySelector('.popup__header');
  }

  open(name, link) {
    this._cardLink.src = link;
    this._cardLink.alt = name;
    this._cardName.textContent = name;

    super.open();
  }
}
