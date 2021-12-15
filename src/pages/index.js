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



const popupFormAuthor = new PopupWithForm(
  popupEditSelector,
  (authorValues) => {
    api.editProfile( authorValues.authorName, authorValues.authorAbout )
      .then((newProfileData) => {
        console.log('newProfileData', newProfileData)
        userInfo.setUserInfo(newProfileData)
      })
      .catch((err) => {
        console.log('err', err);
      })
    popupFormAuthor.close();
  }
);

const popupFormNewCard = new PopupWithForm(
  popupAddSelector,
  (newCardValues) => {
    api.addNewCard( newCardValues.cardName, newCardValues.cardLink )
      .then((cardData) => {
        const newCard = createNewCard(cardData, templateCardSelector, handleClickImg)
        // cardList.addItem(newCard) // TODO разобраться
      })
      .catch((err) => {
        console.log('err', err);
      })
    popupFormNewCard.close();
  }
);

const popupWhithImage = new PopupWithImage(popupWithImageSelector)

api.getUserInfo()
  .then((res) => {
    const name = res.name;
    const about = res.about;
    const avatar = res.avatar;
    const idUser = res._id;
    userInfo.setUserId(idUser);
    userInfo.setUserInfo( { name , about } );
    userInfo.setAvatarUser(avatar)
  })
  .catch((err) => {
    console.log(err);
  })

api.getCards()
  .then((cardsArr) => {
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


function handleClickImg(dataCard) {
  popupWhithImage.open(dataCard);
}

function createNewCard(card, templateCardSelector, handleClickImg) {
  const userId = userInfo.getUserId();
  const prototypeCard = new Card(
    card,
    templateCardSelector,
    handleClickImg,
    userId
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