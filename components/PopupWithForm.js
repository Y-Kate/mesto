class PopupWithForm extends Popup {
  constructor( popupSelector, handleSubmitForm ) {
    super(popupSelector);
    this._inputName = super._popup.querySelector('.form-popup__input_type_name');
    this._inputAbout = super._popup.querySelector('.form-popup__input_type_profession');

  }

  _getInputValues = () => {
    this._valueInputName = this._inputName.value;
    this._valueinputAbout = this._inputAbout.value;
  };

  setEventListeners = () => {

  };

  close = () => {

  };
}

function handleSubmitFormEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputName.value;
  profileDescriptionElement.textContent = inputAbout.value;
  closePopup(popupEdit);
}
