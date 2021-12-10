import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor( popupSelector, handleSubmit ) {
    super(popupSelector);
    this._inputName = this._popup.querySelector('.form-popup__input_type_name');
    this._inputAbout = this._popup.querySelector('.form-popup__input_type_profession');
    this._form = this._popup.querySelector('.form-popup');
    this._handleSubmit = handleSubmit;
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this._handleSubmit(values);
  }

  _getInputValues = () => {
    const value = this._inputName.value;
    const name = this._inputName.name;
    const valueAbout = this._inputAbout.value;
    const nameAbout = this._inputAbout.name;
    const values = {
      name: value,
      nameAbout: valueAbout
    };
    return values;
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