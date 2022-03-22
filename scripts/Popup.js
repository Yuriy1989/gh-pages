//Функция открытия попапов
// export const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// }

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-image')) {
          closePopup(popup)
        }
      })
    })
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    console.log( this._popupSelector);
    this.setEventListeners();
    document.addEventListener('click', () => {
      this._handleEscClose()
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
}


// Навешивает событие на popup для зыкрытия по клавище Esc
// export const closeByEscape = (evt) => {
//   if(evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup (openedPopup);
//   }
// }

// Функция закрытия попапа
// export const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// }
