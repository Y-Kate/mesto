import './index.css';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  buttonEdit,
  buttonAdd,
  inputName,
  inputAbout,
  formProfileEdit,
  formCardAdd,
  templateCardSelector,
  dataClasses,
  popupEditSelector,
  popupAddSelector,
  popupWithImageSelector,
  catalogCardsSelector,
  profileSelectors,
} from '../utils/constants.js'

// создаем экземпляры классов
const api = new Api();
const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);

const userInfo = new UserInfo(profileSelectors)

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
  }
);

const popupWhithImage = new PopupWithImage(popupWithImageSelector)

api.getUserInfo()
  .then((res) => {
    const name = res.name;
    const about = res.about;
    const avatar = res.avatar;
    userInfo.setUserInfo( { name , about } );
    userInfo.setAvatarUser(avatar)
  })
  .catch((err) => {
    console.log(err);
  })


// запускаем экземпляры классов
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
popupFormAuthor.setEventListeners();
popupFormNewCard.setEventListeners();
popupWhithImage.setEventListeners();
cardList.renderItems();

function handleClickImg(dataCard) {
  popupWhithImage.open(dataCard);
}

function createNewCard(card, templateCardSelector, handleClickImg) {
  const prototypeCard = new Card(
    card,
    templateCardSelector,
    handleClickImg
  );
  return prototypeCard.createCard();
}


// обработчики слушателей кнопок
function handleClickButtonEdit() {
  const dataUser = userInfo.getUserInfo();
  inputName.value = dataUser.name;
  inputAbout.value = dataUser.about;
  formEditProfileValidator.checkInputsError();
  popupFormAuthor.open();
}

function handleClickButtonAdd() {
  formAddCardValidator.clearErrors();
  popupFormNewCard.open();
}

// слушатели кнопок на странице
buttonEdit.addEventListener('click', handleClickButtonEdit);
buttonAdd.addEventListener('click', handleClickButtonAdd);