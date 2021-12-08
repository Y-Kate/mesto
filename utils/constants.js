export const initialCards = [
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

// кнопки на странице
export const buttonEdit = document.querySelector('.profile__modify');
export const buttonAdd = document.querySelector('.profile__button-add');

// профиль
export const profileNameElement = document.querySelector('.profile__name');
export const profileDescriptionElement  = document.querySelector('.profile__description');

// все попапы
export const popups = Array.from(document.querySelectorAll('.popup'));

// popup редактирования профиля
export const popupEditSelector = '.popup_type_edit';
export const popupEdit = document.querySelector('.popup_type_edit');
export const inputName = popupEdit.querySelector('.form-popup__input_type_name');
export const inputAbout = popupEdit.querySelector('.form-popup__input_type_profession');
export const formProfileEdit = popupEdit.querySelector('.form-popup');

// popup добавления карточки
export const popupAddSelector = '.popup_type_add';
export const popupAdd = document.querySelector('.popup_type_add');
export const formCardAdd = popupAdd.querySelector('.form-popup');
export const inputCardName = popupAdd.querySelector('.form-popup__input_type_name-card');
export const inputCardLink = popupAdd.querySelector('.form-popup__input_type_link-card');
export const buttonSubmitAddCard = formCardAdd.querySelector('.form-popup__button-save');

// popup просмотра карточки
export const popupWithImage = document.querySelector('.popup_type_img');

// popup img
export const imageInPopup = popupWithImage.querySelector('.popup__image');
export const figcaptionPopup = popupWithImage.querySelector('.popup__figcaption');

// карточки
export const catalogCardsContainer = document.querySelector('.catalog');

// для классов
export const templateCardSelector = '#templateCard';

export const dataClasses = {
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-save',
  inactiveButtonClass: 'form-popup__button-invalid',
  inputErrorClass: 'form-popup__input_state_invalid',
}


