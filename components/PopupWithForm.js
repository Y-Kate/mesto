import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor( popupSelector, handleSubmitForm ) {
    super(popupSelector);
    this._inputName = this._popup.querySelector('.form-popup__input_type_name');
    this._inputAbout = this._popup.querySelector('.form-popup__input_type_profession');
    this._form = this._popup.querySelector('.form-popup');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues = () => {
    this._valueInputName = this._inputName.value;
    this._valueinputAbout = this._inputAbout.value;
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitForm);
  };
  
  close = () => {
    super.close();
    this._form.reset(); // сбрасывание формы
  };
};

export default PopupWithForm;