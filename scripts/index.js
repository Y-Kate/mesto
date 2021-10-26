// кнопки на странице
const buttonEdit = document.querySelector('.profile__modify');
const buttonAdd = document.querySelector('.profile__button-add');

// профиль
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement  = document.querySelector('.profile__description');

// popup редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const crossPopupEdit = popupEdit.querySelector('.popup__close');
const inputName = popupEdit.querySelector('.form-popup__input_type_name');
const inputAbout = popupEdit.querySelector('.form-popup__input_type_profession');
const formProfileEdit = popupEdit.querySelector('.form-popup');

// popup добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const crossPopupAdd = popupAdd.querySelector('.popup__close');
const formCardAdd = popupAdd.querySelector('.form-popup');
const inputCardName = popupAdd.querySelector('.form-popup__input_type_name-card');
const inputCardLink = popupAdd.querySelector('.form-popup__input_type_link-card');

// popup просмотра карточки
const popupWithImage = document.querySelector('.popup_type_img');
const crossPopupImg = popupWithImage.querySelector('.popup__close');

// карточки
const formCard = document.querySelector('#templateCard').content;
const catalogCards = document.querySelector('.catalog');

const initialCards = [
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
    console.log(imageInPopup)
  }

  return cardElement;
};

function rendorCard(card) {
  catalogCards.prepend(card);
};

initialCards.forEach((initialCard) => {
  const newCard = createCard(initialCard);
  rendorCard(newCard);
});

// функции popup
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// обработчики форм
function handleSubmitFormEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup(popupEdit);
}

function handleSubmitFormAdd (evt) {
  evt.preventDefault();
  const newDataCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  const newCard = createCard(newDataCard);
  rendorCard(newCard);
  closePopup(popupAdd);
  inputCardName.value = '';
  inputCardLink.value = '';
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

// функции 6 спринт 
init();

function init() {
  const forms = Array.from(document.querySelectorAll('.form-popup'));
  forms.forEach(addListenersToForm);
};

function addListenersToForm(form) {
  const inputs = Array.from(form.querySelectorAll('.form-popup__input'));

  inputs.forEach(addlistenersToInput);
}

function addlistenersToInput(input) {
  input.addEventListener('input', handleFieldValidation);
}

function handleFieldValidation(evt) {
  const element = evt.target;
  const ErrorContainer = document.querySelector(`#${element.id}-error`);
  
  // if (element.validity.tooShort || element.validity.tooLong) {
  //     element.setCustomValidity('в поле «Имя» должно быть от 2 до 40 символов')
  // };
  
  ErrorContainer.textContent = element.validationMessage;
  element.classList.toggle(
    'form-popup__input_state_invalid', 
    !element.validity.valid,
  );
}
//функции 6 спринт 

// слушатели кнопок на странице
buttonEdit.addEventListener('click', handleClickButtonEdit);
buttonAdd.addEventListener('click', handleClickButtonAdd);

// слушатели форм
formProfileEdit.addEventListener('submit', handleSubmitFormEdit);
formCardAdd.addEventListener('submit', handleSubmitFormAdd);

// слушатели cross
crossPopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});
crossPopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});
crossPopupImg.addEventListener('click', () => {
  closePopup(popupWithImage);
});