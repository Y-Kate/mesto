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
const formCard = document.querySelector('#templateCard').content;
const catalogCards = document.querySelector('.catalog');



// функции для карточек
function createCard (card) {
  const cardElement = formCard.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  // наполнение информацией
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;


  // слушатели like
  const buttonLike = cardElement.querySelector('.card__button-like');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('card__button-like_active');
  });

  // слушатели trash
  const buttonTrash = cardElement.querySelector('.card__button-trash');
  buttonTrash.addEventListener('click', () => {
    cardElement.remove();
  });

  // popup img
  const imageInPopup = popupWithImage.querySelector('.popup__image');
  const figcaptionPopup = popupWithImage.querySelector('.popup__figcaption');
  cardImage.addEventListener('click', handleClickImg);

  function handleClickImg () {
    openPopup(popupWithImage);
    imageInPopup.src = card.link;
    imageInPopup.alt = card.name;
    figcaptionPopup.textContent = card.name;
  }

  return cardElement;
};

function renderCard(card) {
  catalogCards.prepend(card);
};

initialCards.forEach((initialCard) => {
  const newCard = createCard(initialCard);
  renderCard(newCard);
});

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

function handleSubmitFormAdd(evt) {
  evt.preventDefault();
  const newDataCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  const newCard = createCard(newDataCard);
  renderCard(newCard);
  closePopup(popupAdd);
  formCardAdd.reset();
  buttonSubmitAddCard.classList.add('form-popup__button-invalid');
  buttonSubmitAddCard.disabled = true;
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

