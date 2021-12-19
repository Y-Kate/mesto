import './index.css';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo.js';
import PopupWhithСonsent from '../components/PopupWhithСonsent.js';
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
  popupWhithСonsentSelector
} from '../utils/constants.js'

// создаем экземпляры классов
const api = new Api();
const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);
const userInfo = new UserInfo(profileSelectors);
const popupWhithСonsent = new PopupWhithСonsent(
  popupWhithСonsentSelector,
  (element, elementId) => {
    api.deleteCard( elementId )
      .then(() => { 
        element.remove();
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
);

const popupFormAuthor = new PopupWithForm(
  popupEditSelector,
  (authorValues) => {
    api.editProfile( authorValues.authorName, authorValues.authorAbout )
      .then((newProfileData) => {
        userInfo.setUserInfo(newProfileData)
      })
      .catch((err) => {
        console.log('err', err);
      })
    popupFormAuthor.close();
  }
);

const popupWhithImage = new PopupWithImage(popupWithImageSelector)

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cardsArr]) => {
    const name = userData.name;
    const about = userData.about;
    const avatar = userData.avatar;
    const idUser = userData._id;
    userInfo.setUserId(idUser);
    userInfo.setUserInfo( { name , about } );
    userInfo.setAvatarUser(avatar)

    const cardList = new Section(
      {
        items: cardsArr,
        renderer: function renderer(card) {
          const newCard = createNewCard(card, templateCardSelector, handleClickImg)
          cardList.addItem(newCard)
        }
      },
      catalogCardsSelector
    )
    cardList.renderItems();
    
    const popupFormNewCard = new PopupWithForm(
      popupAddSelector,
      (newCardValues) => {
        api.addNewCard( newCardValues.cardName, newCardValues.cardLink )
          .then((cardData) => {
            const newCard = createNewCard(cardData, templateCardSelector, handleClickImg);
            cardList.addItemToStart(newCard) 
          })
          .catch((err) => {
            console.log('err', err);
          })
        popupFormNewCard.close();
      }
    );
    popupFormNewCard.setEventListeners();
    function handleClickButtonAdd() {
      formAddCardValidator.clearErrors();
      popupFormNewCard.open();
    }
    buttonAdd.addEventListener('click', handleClickButtonAdd);
  })
  .catch((err) => {
    console.log(err);
  })


// запускаем экземпляры классов
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
popupFormAuthor.setEventListeners();
popupWhithImage.setEventListeners();
popupWhithСonsent.setEventListeners();

function handleClickButtonTrash(cardElement, cardId) {
  popupWhithСonsent.open(cardElement, cardId);
}

function handleClickImg(dataCard) {
  popupWhithImage.open(dataCard);
}

function createNewCard(card, templateCardSelector, handleClickImg) {
  const userId = userInfo.getUserId();
  const prototypeCard = new Card(
    card,
    templateCardSelector,
    handleClickImg,
    userId,
    handleClickButtonTrash,
    handleClickButtonLike
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

function handleClickButtonLike() {
  const userId = userInfo.getUserId();
  if (!this._isLiked()) {
    api.setLike(userId)
      .then((res) => {
        console.log(res); 
        this._buttonLike.classList.add('card__button-like_active');
      })
      .catch((err) => {
        console.log('err', err);
      })
  } else {
    api.deleteLike(userId)
      .then((res) => { 
      this._buttonLike.classList.remove('card__button-like_active');
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
}

// function handleClickButtonAdd() {
//   formAddCardValidator.clearErrors();
//   popupFormNewCard.open();
// }

// слушатели кнопок на странице
buttonEdit.addEventListener('click', handleClickButtonEdit);
// buttonAdd.addEventListener('click', handleClickButtonAdd);