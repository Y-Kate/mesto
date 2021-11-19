import FormValidator from './FormValidator.js';
import { initialCards } from './initial-сards.js';
import Card from './Card.js';

// кнопки на странице
const buttonEdit = document.querySelector('.profile__modify');
const buttonAdd = document.querySelector('.profile__button-add');

// профиль
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement  = document.querySelector('.profile__description');

// все попапы

const popups = Array.from(document.querySelectorAll('.popup'));

// popup редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const inputName = popupEdit.querySelector('.form-popup__input_type_name');
const inputAbout = popupEdit.querySelector('.form-popup__input_type_profession');
const formProfileEdit = popupEdit.querySelector('.form-popup');

// popup добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const formCardAdd = popupAdd.querySelector('.form-popup');
const inputCardName = popupAdd.querySelector('.form-popup__input_type_name-card');
const inputCardLink = popupAdd.querySelector('.form-popup__input_type_link-card');
const buttonSubmitAddCard = formCardAdd.querySelector('.form-popup__button-save');

// popup просмотра карточки
const popupWithImage = document.querySelector('.popup_type_img');

// карточки
const catalogCards = document.querySelector('.catalog');

////////////////////////////////////////// для классов
const templateCardSelector = '#templateCard';

const dataClasses = {
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-save',
  inactiveButtonClass: 'form-popup__button-invalid',
  inputErrorClass: 'form-popup__input_state_invalid',
}
// обработчики значений input

const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);

formEditProfileValidator.setEventListeners();
formAddCardValidator.setEventListeners();


// function enableValidation(dataClasses) {
//   const forms = Array.from(document.querySelectorAll(dataClasses.formSelector));
//   forms.forEach((form) => {
//     form.addEventListener('submit', (evt) => {
//       evt.preventDefault() // зачем нужна повторная отмена стандартной отправки формы? Мы ведь в обработчиках submit на 102 и 109 строчках в index.js их уже отменяем
//     });
//     setEventListeners(form, dataClasses);
//   });
// }

// enableValidation(dataClasses);





//////////////////////////////////////////////////////////

// popup img
const imageInPopup = popupWithImage.querySelector('.popup__image');
const figcaptionPopup = popupWithImage.querySelector('.popup__figcaption');

// функция popup Img
// function handleClickImg () {
//   openPopup(popupWithImage);
//   imageInPopup.src = card.link;
//   imageInPopup.alt = card.name;
//   figcaptionPopup.textContent = card.name;
// }




function keyHandler(evt) {
  if (checkClosePopup(evt)) {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup);
  }
}

// функции popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

function openPopup(popup) {
  document.addEventListener('keydown', keyHandler);
  popup.classList.add('popup_opened');
}

// обработчики форм
function handleSubmitFormEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup(popupEdit);
}

const renderCard = (cardElement) => {
  catalogCards.prepend(cardElement);
};

initialCards.forEach((initialCard) => {
  const prototypeCard = new Card(initialCard, templateCardSelector);
  const newCard = prototypeCard.createCard();
  renderCard(newCard);
  
});


function handleSubmitFormAdd(evt) {
  evt.preventDefault();

  const newDataCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  
  // const inputsArray = [ // TODO ненужно?
  //   inputCardName,
  //   inputCardLink
  // ];

  const newCard = renderCard(newCard);
  
  closePopup(popupAdd);
  formCardAdd.reset();
  
  // const newCard = createCard(newDataCard);
  // renderCard(newCard);
  // closePopup(popupAdd);
  // formCardAdd.reset();
  // toggleActivateButtonSubmit(buttonSubmitAddCard, dataClasses, true);

}
/////////////////


/////////////////



// обработчики слушателей кнопок
function handleClickButtonEdit() {
  inputName.value = profileNameElement.textContent;
  inputAbout.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
}

function handleClickButtonAdd() {
  openPopup(popupAdd);
}

// проверка закрывать попап или нет
function checkClosePopup(evt) {
  return evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget || evt.key === "Escape";
}

// слушатели кнопок на странице
buttonEdit.addEventListener('click', handleClickButtonEdit);
buttonAdd.addEventListener('click', handleClickButtonAdd);

// слушатели форм
formProfileEdit.addEventListener('submit', handleSubmitFormEdit);
formCardAdd.addEventListener('submit', handleSubmitFormAdd);

// закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (checkClosePopup(evt)) {
      closePopup(popup);
    }
  });
});

