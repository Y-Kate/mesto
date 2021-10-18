// кнопки на странице
const buttonEdit = document.querySelector('.profile__modify');
const buttonAdd = document.querySelector('.profile__button-add');

// профиль
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement  = document.querySelector('.profile__description');

// popup редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const crossPopupEdit = popupEdit.querySelector('.popup__close');
const inputName = popupEdit.querySelector('.form-popup__input_type_name');
const inputAbout = popupEdit.querySelector('.form-popup__input_type_profession');
const formProfileEdit = popupEdit.querySelector('.form-popup_type_edit');

// popup добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const crossPopupAdd = popupAdd.querySelector('.popup__close');


// карточки
const formCard = document.querySelector('#templateCard').content;
const catalogCards = document.querySelector('.catalog');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функции для карточек
function rendorCard (card) {
  const cardElement = formCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  catalogCards.append(cardElement);
};

initialCards.forEach((initialCard) => rendorCard(initialCard));

// функции popup
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// обработчики форм
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup(popupEdit);
}

// обработчики слушателей кнопок
function handleClickButtonEdit() {
  inputName.value = profileNameElement.textContent;
  inputAbout.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
}

function handleClickButtonAdd() {
  openPopup(popupAdd);
}

// слушатели
formProfileEdit.addEventListener('submit', formSubmitHandler);
buttonEdit.addEventListener('click', handleClickButtonEdit);
crossPopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});
buttonAdd.addEventListener('click', handleClickButtonAdd);
crossPopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});
