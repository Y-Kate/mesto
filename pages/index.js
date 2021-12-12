import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
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
  popupAddSelector,
  popupWithImageSelector,
  catalogCardsSelector,
  profileSelectors,
} from '../utils/constants.js' // импорт всех констант

const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);
const userInfo = new UserInfo(profileSelectors)

const popupFormAuthor = new PopupWithForm(
  popupEditSelector,
  (authorValues) => {
    const newAuthorData = {
      name: authorValues['author-name'],
      about: authorValues['author-about']
    }
    userInfo.setUserInfo(newAuthorData)
    popupFormAuthor.close();
  }
);

const popupFormNewCard = new PopupWithForm(
  popupAddSelector,
  (newCardValues) => {
    const newDataCard = {
      name: newCardValues['card-name'],
      link: newCardValues['card-link']
    };
    const newCard = createNewCard(newDataCard, templateCardSelector, handleClickImg)
    cardList.addItem(newCard)
    popupFormNewCard.close();
    formCardAdd.reset();
    formAddCardValidator.toggleActivateButtonSubmit(buttonSubmitAddCard, dataClasses, true);
  }
);

popupFormAuthor.setEventListeners();
popupFormNewCard.setEventListeners();




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

function handleClickImg(dataCard) {
  const popupWhithImage = new PopupWithImage(
    dataCard,
    popupWithImageSelector
  )
  popupWhithImage.open();
}

function createNewCard(card, templateCardSelector, handleClickImg) {
  const prototypeCard = new Card(
    card,
    templateCardSelector,
    handleClickImg
  );
  return prototypeCard.createCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: function renderer(initialCard) {
      const newCard = createNewCard(initialCard, templateCardSelector, handleClickImg)
      cardList.addItem(newCard)
    }
  },
  catalogCardsSelector
)

cardList.renderItems();

// обработчики слушателей кнопок
function handleClickButtonEdit() {
  const dataUser = userInfo.getUserInfo();
  inputName.value = dataUser.name;
  inputAbout.value = dataUser.about;
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
