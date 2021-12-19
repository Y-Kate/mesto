import Popup from "./Popup.js";

class PopupWhithСonsent extends Popup {
  constructor( popupSelector, handleRemoveCard ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form-popup');
    this._handleRemoveCard = handleRemoveCard;
  }

  open = (element) => {
    super.open();
    this._element = element;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitButton);
  }

  _handleSubmitButton = (evt) => {
    evt.preventDefault();
    this._handleRemoveCard(this._element);
    this.close(); 
  }
}

export default PopupWhithСonsent;