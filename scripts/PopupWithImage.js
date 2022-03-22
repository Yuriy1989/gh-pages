import {Popup} from './Popup.js';
import {itemCard, headerPopupCard} from './utils.js';


export class PopupWithImage extends Popup {
  constructor (popupSelector, name, link) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    itemCard.src = this._link;
    itemCard.alt = this._name;
    headerPopupCard.textContent = this._name;

    // console.log(this._popupSelector);
    this._popupSelector.classList.add('popup_opened');
    super._handleEscClose(this._popupSelector);

    document.addEventListener('keydown', (evt) => {
      super._handleEscClose(evt);
    });
  }
}
