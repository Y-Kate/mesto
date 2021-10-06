const buttonEdit = document.querySelector('.profile__modify');
const popup = document.querySelector('.popup');
const popupCross = document.querySelector('.popup__close');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement  = document.querySelector('.profile__description');
const inputName = document.querySelector('.form-edit__input_type_name');
const inputAbout = document.querySelector('.form-edit__input_type_profession');
const formProfileEdit = document.querySelector('.form-edit');

function closePopup () {
  popup.classList.remove('popup_opened');
}

function openPopup () {
  popup.classList.add('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup();
}

function handleClickButtonEdit() {
  inputName.value = profileNameElement.textContent;
  inputAbout.value = profileDescriptionElement.textContent;
  openPopup();
}

formProfileEdit.addEventListener('submit', formSubmitHandler);

buttonEdit.addEventListener('click', handleClickButtonEdit);

popupCross.addEventListener('click', closePopup);
