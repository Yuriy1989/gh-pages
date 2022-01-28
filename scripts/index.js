let profileEditPopupButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
const templatePopup = document.querySelector('#popup').content;
const page = document.querySelector('.page');

const initialCards = [
  {
    name: 'Салоники - город на побережье залива Термаикос',
    link: 'https://images.unsplash.com/photo-1630391886685-b3ef8d10de53'
  },
  {
    name: 'Таймс-сквер, Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1642873744568-a7c5f7d10aae'
  },
  {
    name: 'Атрани, Италия',
    link: 'https://images.unsplash.com/photo-1576875356666-988d2a13651c'
  },
  {
    name: 'Санкт-Антон-ам-Арльберг, Австрия',
    link: 'https://images.unsplash.com/photo-1642712005967-a27db48c3bed'
  },
  {
    name: 'Мост Золотые Ворота, Сан-Франциско',
    link: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80'
  },
  {
    name: 'Колизей или амфитеатр Флавиев, Рим',
    link: 'https://images.unsplash.com/photo-1569343051392-7cf0a301baa9'
  }
];

// Функция создания секции карточек
function addSectionCards () {
  const sectionProfile = document.querySelector('.profile');
  const sectionElements = document.createElement('section');
  sectionElements.classList.add('elements');
  const ulElements = document.createElement('ul');
  ulElements.classList.add('cards');
  sectionElements.append(ulElements);
  sectionProfile.after(sectionElements);
}

// Функция создания карточек из массива
function addCard(item) {
  const cards = document.querySelector('.cards');
  const liCardItem = document.createElement('li');
  liCardItem.classList.add('cards__item');
  const imageCard = document.createElement('img');
  imageCard.classList.add('cards__image');
  imageCard.setAttribute('src', `${item.link}`);
  imageCard.setAttribute('alt', `${item.name}`);
  const divCardDescription = document.createElement('div');
  divCardDescription.classList.add('cards__description');
  const headerCardText = document.createElement('h2');
  headerCardText.classList.add('cards__text');
  headerCardText.textContent = `${item.name}`;
  const buttonCardLike = document.createElement('button');
  buttonCardLike.classList.add('cards__button');
  const imageCardLike = document.createElement('img');
  imageCardLike.classList.add('cards__like');
  imageCardLike.setAttribute('src', 'images/heart.svg');
  imageCardLike.setAttribute('alt', 'Сердечко белого цвета с черной оконтовкой');
  buttonCardLike.append(imageCardLike);
  divCardDescription.append(headerCardText, buttonCardLike);
  liCardItem.append(imageCard, divCardDescription);
  cards.append(liCardItem);
}

// Функция открытия попапа
function openPopup (event) {
  popup.classList.add('popup_opened');
  let textProfileTitle = valueProfileTitle.textContent;
  let textProfileText = valueProfileText.textContent;
  nameInput.value = textProfileTitle;
  jobInput.value = textProfileText;
}

// Функция открытия попапа для редактирования профиля
function openPopupEditProfile (event) {
  const userEditPopup = templatePopup.querySelector('.popup').cloneNode(true);
  userEditPopup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  userEditPopup.querySelector('.popup__button').value = 'Сохранить';
  userEditPopup.classList.add('popup_opened');

  let valueProfileTitle = document.querySelector('.profile__title').textContent;
  let valueProfileText = document.querySelector('.profile__text').textContent;

  userEditPopup.querySelector('.popup__input_string_name').value = `${valueProfileTitle}`;
  userEditPopup.querySelector('.popup__input_string_text').value = `${valueProfileText}`;
  page.append(userEditPopup);

  userEditPopup.querySelector('.popup__close').addEventListener('click', function(evn) {
    closePopup();
  })

  userEditPopup.querySelector('.popup__button').addEventListener('click', function(evn) {
    formSubmitHandler();
    console.log('add function');
  })
}

// Функция закрытия попапа
function closePopup () {
  const popup = document.querySelector('.popup');
  popup.remove();
}

// Функция изменения имени и работы
function formSubmitHandler (evt) {
  // evt.preventDefault();

  let valueProfileTitle = document.querySelector('.profile__title');
  let valueProfileText = document.querySelector('.profile__text').textContent;

  valueProfileTitle.textContent = document.querySelector('.popup__input_string_name').value;
  valueProfileText.textContent = document.querySelector('.popup__input_string_text').value;

  closePopup();
}

// Обработчики событий
profileEditPopupButton.addEventListener('click', openPopupEditProfile);

// создания секции карточек
addSectionCards();

// создания карточек
initialCards.forEach(item => addCard(item));


// popup.addEventListener('click', function(event) {
//   if(event.target === event.currentTarget) {
//     event.stopPropagation();
//     closePopup();
//   }
// });
