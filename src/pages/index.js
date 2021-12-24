import './index.css';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import {
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
  popupWithConfirmationSelector,
  popupAvatarSelector,
  avatarOverlayElement,
  formEditAvatarElement
} from '../utils/constants.js'

// создаем экземпляры классов
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: 'c1e5c7f7-edbc-434c-87e1-05004dec9bd7',
    'Content-Type': 'application/json'
  }});

const formEditProfileValidator = new FormValidator(dataClasses, formProfileEdit);
const formAddCardValidator = new FormValidator(dataClasses, formCardAdd);
const formEditAvatar = new FormValidator(dataClasses, formEditAvatarElement);
const userInfo = new UserInfo(profileSelectors);
const popupWithConfirmation = new PopupWithConfirmation(
  popupWithConfirmationSelector,
  (card) => {
    api.deleteCard( card.idCard )
      .then(() => { 
        card.removeCard();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
);

const popupFormAuthor = new PopupWithForm(
  popupEditSelector,
  (authorValues) => {
    popupFormAuthor.setButtonSubmitName('Сохранение...');
    api.editProfile( authorValues.authorName, authorValues.authorAbout )
      .then((newProfileData) => {
        userInfo.setUserInfo(newProfileData)
        popupFormAuthor.close();
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        popupFormAuthor.setButtonSubmitName('Сохранить');
      })
  }
);

const popupFormAvatar = new PopupWithForm(
  popupAvatarSelector,
  ( { avatarLink } ) => {
    popupFormAvatar.setButtonSubmitName('Сохранение...');
    api.updateAvatar(avatarLink)
      .then((newProfileData) => {
        userInfo.setAvatarUser(newProfileData.avatar);
        popupFormAvatar.close();
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        popupFormAvatar.setButtonSubmitName('Сохранить');
      })
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
        popupFormNewCard.setButtonSubmitName('Создание...');
        api.addNewCard( newCardValues.cardName, newCardValues.cardLink )
          .then((cardData) => {
            const newCard = createNewCard(cardData, templateCardSelector, handleClickImg);
            cardList.addItemToStart(newCard);
            popupFormNewCard.close();
          })
          .catch((err) => {
            console.log('err', err);
          })
          .finally(() => {
            popupFormNewCard.setButtonSubmitName('Создать');
          })
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
formEditAvatar.enableValidation();
popupFormAuthor.setEventListeners();
popupWhithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupFormAvatar.setEventListeners();

function handleClickButtonTrash(card) {
  popupWithConfirmation.open(card);
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
  if (!this.isLiked()) {
    api.setLike(this.idCard)
      .then((res) => {
        this.likesArray = res.likes;
        this.checkLike();
        this.setCountLikes();
      })
      .catch((err) => {
        console.log('err', err);
      })
  } else {
    api.deleteLike(this.idCard)
      .then((res) => {
        this.likesArray = res.likes;
        this.checkLike();
        this.setCountLikes();
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
}

function handleClickAvatar() {
  popupFormAvatar.open();
}

// слушатели кнопок на странице
buttonEdit.addEventListener('click', handleClickButtonEdit);
avatarOverlayElement.addEventListener('click', handleClickAvatar);
