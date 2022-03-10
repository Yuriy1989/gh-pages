export const popupOpenCard = document.querySelector('.popup_card-open');
export const headerPopupCard = popupOpenCard.querySelector('.popup__header');
export const itemCard = popupOpenCard.querySelector('.popup__image');

//Функция открытия попапов
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Навешивает событие на popup для зыкрытия по клавище Esc
export const closeByEscape = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
}

// Функция закрытия попапа
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
