import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import {
  initialCards,
  buttonEdit,
  buttonAdd,
  profileNameElement,
  profileDescriptionElement,
  popups,
  popupEdit,
  inputName,
  inputAbout,
  formProfileEdit,
  popupAdd,
  formCardAdd,
  inputCardName,
  inputCardLink,
  buttonSubmitAddCard,
  popupWithImage,
  imageInPopup,
  figcaptionPopup,
  catalogCardsContainer,
  templateCardSelector,
  dataClasses
} from '../utils/constants.js' // импорт всех констант

const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);


// функции popup Img
// export function handleClickImg (dataCard) {
//   imageInPopup.src = dataCard.link;
//   imageInPopup.alt = dataCard.name;
//   figcaptionPopup.textContent = dataCard.name;
//   openPopup(popupWithImage);
// }

// function keyHandler(evt) {
//   if (checkClosePopup(evt)) {
//     const activePopup = document.querySelector('.popup_opened')
//     closePopup(activePopup);
//   }
// }

// // функции popup
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', keyHandler);
// }

// function openPopup(popup) {
//   document.addEventListener('keydown', keyHandler);
//   popup.classList.add('popup_opened');
// }

// обработчики форм
function handleSubmitFormEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup(popupEdit);
}

const renderCard = (cardElement) => {
  catalogCardsContainer.prepend(cardElement);
};

function createNewCard(card) {
  const prototypeCard = new Card(card, templateCardSelector);
  const newCard = prototypeCard.createCard();
  renderCard(newCard);
}


function handleSubmitFormAdd(evt) {
  evt.preventDefault();
  const newDataCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  createNewCard(newDataCard);
  closePopup(popupAdd);
  formCardAdd.reset();
  formAddCardValidator.toggleActivateButtonSubmit(buttonSubmitAddCard, dataClasses, true);
}

// обработчики слушателей кнопок
function handleClickButtonEdit() {
  inputName.value = profileNameElement.textContent;
  inputAbout.value = profileDescriptionElement.textContent;
  formEditProfileValidator.checkInputsError();
  openPopup(popupEdit);
}

function handleClickButtonAdd() {
  openPopup(popupAdd);
}

// // проверка закрывать попап или нет
// function checkClosePopup(evt) {
//   return evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget || evt.key === "Escape";
// }

// function handleClickPopup(evt) {
//   if (checkClosePopup(evt)) {
//     closePopup(evt.currentTarget);
//   }
// };

initialCards.forEach(createNewCard);

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

// слушатели кнопок на странице
buttonEdit.addEventListener('click', handleClickButtonEdit);
buttonAdd.addEventListener('click', handleClickButtonAdd);

// слушатели форм
formProfileEdit.addEventListener('submit', handleSubmitFormEdit);
formCardAdd.addEventListener('submit', handleSubmitFormAdd);

// // закрытие попапов
// popups.forEach((popup) => {
//   popup.addEventListener('click', handleClickPopup);
// });
