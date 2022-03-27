import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._CardLink = this._popup.querySelector('.popup__image');
    this._CardName = this._popup.querySelector('.popup__header');
  }

  open(name, link) {
    this._CardLink.src = link;
    this._CardLink.alt = name;
    this._CardName.textContent = name;

    super.open();
  }
}
