const buttonEdit = document.querySelector('.profile__modify');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCross = document.querySelector('.popup__close');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement  = document.querySelector('.profile__description');
const inputName = document.querySelector('.form-popup__input_type_name');
const inputAbout = document.querySelector('.form-popup__input_type_profession');
const formProfileEdit = document.querySelector('.form-popup_type_edit');

//изменение из 6 спринта в const
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

const formCard = document.querySelector('#templateCard').content;
const catalogCards = document.querySelector('.catalog');
const buttonAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup_type_add');
// const formCardAdd = document.querySelector('.form-popup_type_add');


function rendorCard (card) {
  
  // return `<img src="${card.link}" alt="${card.name}" class="card__image">
  // <div class="card__description">
  //   <h2 class="card__title">${card.name}</h2>
  //   <button type="button" class="card__button-like" aria-label="Нравится"></button>
  // </div>`;
  const cardElement = formCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  catalogCards.append(cardElement);
  // console.log(cardElement);


};

initialCards.forEach((initialCard) => rendorCard(initialCard));

// formCard.innerHTML = initialCards.map((initialCard) => rendorCard(initialCard));
// console.log(cardElement);
// formCard.innerHTML = initialCards.map(rendorCard);
// const cards = initialCards.map((initialCard) => rendorCard(initialCard));

// console.log(cards);


function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup(popupEdit);
}

function handleClickButtonEdit() {
  inputName.value = profileNameElement.textContent;
  inputAbout.value = profileDescriptionElement.textContent;
  openPopup(popupEdit);
}

function handleClickButtonAdd() {
  openPopup(popupAdd);
}
//изменение из 6 спринта в функциях
formProfileEdit.addEventListener('submit', formSubmitHandler);

buttonEdit.addEventListener('click', handleClickButtonEdit);

popupCross.addEventListener('click', () => {
  closePopup(popupEdit);
});

buttonAdd.addEventListener('click', handleClickButtonAdd);

// formCardAdd.addEventListener('submit', formSubmitHandler);