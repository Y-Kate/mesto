import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor( popupSelector, handleSubmit ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form-popup');
    this._handleSubmit = handleSubmit;
    this._inputs = Array.from(this._form.querySelectorAll('.form-popup__input'));
  }

  _handleSubmitForm = (evt) => {
    evt.preventDefault();
    const values = this._getInputValues();
    this._handleSubmit(values);
  }

  _getInputValues = () => {
    let values = {}
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
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