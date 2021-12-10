import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
  dataClasses,
  popupEditSelector,
  popupAddSelector
} from '../utils/constants.js' // импорт всех констант

const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);

const popupFormAuthor = new PopupWithForm(
  popupEditSelector,
  function handleSubmitFormEdit(authorValues) {
    profileNameElement.textContent = authorValues['author-name'];
    profileDescriptionElement.textContent = authorValues['author-about'];
    popupFormAuthor.close();
  }
);

const popupFormNewCard = new PopupWithForm(
  popupAddSelector,
  function handleSubmitFormAdd(newCardValues) {
  console.log('newCardValues', newCardValues);
    const newDataCard = {
      name: newCardValues['card-name'],
      link: newCardValues['card-link']
    };
    createNewCard(newDataCard);
    popupFormNewCard.close();
    formCardAdd.reset();
    formAddCardValidator.toggleActivateButtonSubmit(buttonSubmitAddCard, dataClasses, true);
  }
);

popupFormAuthor.setEventListeners();
popupFormNewCard.setEventListeners();


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



const renderCard = (cardElement) => {
  catalogCardsContainer.prepend(cardElement);
};

function createNewCard(card) {
  const prototypeCard = new Card(card, templateCardSelector);
  const newCard = prototypeCard.createCard();
  renderCard(newCard);
}




// обработчики слушателей кнопок
function handleClickButtonEdit() {
  inputName.value = profileNameElement.textContent;
  inputAbout.value = profileDescriptionElement.textContent;
  formEditProfileValidator.checkInputsError();
  popupFormAuthor.open();
}

function handleClickButtonAdd() {
  popupFormNewCard.open();
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
// formProfileEdit.addEventListener('submit', handleSubmitFormEdit);
// formCardAdd.addEventListener('submit', handleSubmitFormAdd);

// // закрытие попапов
// popups.forEach((popup) => {
//   popup.addEventListener('click', handleClickPopup);
// });
