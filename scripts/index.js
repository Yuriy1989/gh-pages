const initialCards = [
  {
    name: '1',
    link: 'https://images.unsplash.com/photo-1600366777118-03bef1c26780?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTMzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '2',
    link: 'https://images.unsplash.com/photo-1643041439799-1371ac80a1b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '3',
    link: 'https://images.unsplash.com/photo-1643041440473-d4a721b366f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '4',
    link: 'https://images.unsplash.com/photo-1642367321132-0d1c28d2ae66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '5',
    link: 'https://images.unsplash.com/photo-1641665665631-ee1d959e5be3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '6',
    link: 'https://images.unsplash.com/photo-1641226469620-16a914f597e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }
];

function addSectionCards () {
  const sectionProfile = document.querySelector('.profile');
  const sectionElements = document.createElement('section');
  sectionElements.classList.add('elements');
  const ulElements = document.createElement('ul');
  ulElements.classList.add('cards');
  sectionElements.append(ulElements);
  sectionProfile.after(sectionElements);
}

function addCard() {
  const cards = document.querySelector('.cards');
  const liCardItem = document.createElement('li');
  liCardItem.classList.add('cards__item');
  const imageCard = document.createElement('img');
  imageCard.classList.add('cards__image');
  const divCardDescription = document.createElement('div');
  divCardDescription.classList.add('cards__description');
  const headerCardText = document.createElement('h2');
  headerCardText.classList.add('cards__text');
  const buttonCardLike = document.createElement('button');
  buttonCardLike.classList.add('cards__buttom');
  const imageCardLike = document.createElement('img');
  imageCardLike.classList.add('cards__like');
  buttonCardLike.append(imageCardLike);
  divCardDescription.append(headerCardText, buttonCardLike);
  liCardItem.append(imageCard, divCardDescription);
  cards.append(liCardItem);
}

addSectionCards();
addCard ();

let profileEditPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_string_name');
let jobInput = document.querySelector('.popup__input_string_text');
let valueProfileTitle = document.querySelector('.profile__title');
let valueProfileText = document.querySelector('.profile__text');

function openPopup (event) {
  popup.classList.add('popup_opened');
  let textProfileTitle = valueProfileTitle.textContent;
  let textProfileText = valueProfileText.textContent;
  nameInput.value = textProfileTitle;
  jobInput.value = textProfileText;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  let valuePopupName = nameInput.value;
  let valuePopupText = jobInput.value;

  valueProfileTitle.textContent = valuePopupName;
  valueProfileText.textContent= valuePopupText;

  closePopup();
}

profileEditPopupButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

// popup.addEventListener('click', function(event) {
//   if(event.target === event.currentTarget) {
//     event.stopPropagation();
//     closePopup();
//   }
// });

formElement.addEventListener('submit', formSubmitHandler);
