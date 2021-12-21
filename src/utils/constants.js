// кнопки на странице
export const buttonEdit = document.querySelector('.profile__modify');
export const buttonAdd = document.querySelector('.profile__button-add');
export const avatarOverlayElement = document.querySelector('.profile__avatar-overlay');

// профиль
export const profileSelectors = {
  authorNameSelector: '.profile__name',
  authorAboutSelector: '.profile__description',
  authorAvatarSelector: '.profile__avatar'
};

// popup редактирования профиля
export const popupEditSelector = '.popup_type_edit';
export const popupEdit = document.querySelector('.popup_type_edit');
export const inputName = popupEdit.querySelector('.form-popup__input_type_name');
export const inputAbout = popupEdit.querySelector('.form-popup__input_type_profession');
export const formProfileEdit = popupEdit.querySelector('.form-popup');

// popup редактирования аватара профиля
export const popupAvatarSelector = '.popup_type_edit-avatar';
const popupAvatarElement = document.querySelector(popupAvatarSelector);
export const formEditAvatarElement = popupAvatarElement.querySelector('.form-popup');

// popup добавления карточки
export const popupAddSelector = '.popup_type_add';
export const popupAdd = document.querySelector('.popup_type_add');
export const formCardAdd = popupAdd.querySelector('.form-popup');

// popup просмотра карточки
export const popupWithImageSelector = '.popup_type_img';

// popup удаления карточки
export const popupWithConfirmationSelector = '.popup_type_delete-card';

// каталог для карточек
export const catalogCardsSelector = '.catalog';

// для создания карточек
export const templateCardSelector = '#templateCard';

export const dataClasses = {
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-save',
  inactiveButtonClass: 'form-popup__button-invalid',
  inputErrorClass: 'form-popup__input_state_invalid',
}


