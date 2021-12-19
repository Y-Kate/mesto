import Popup from "./Popup.js";

class PopupWhithСonsent extends Popup {
  constructor( popupSelector, handleRemoveCard ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form-popup');
    this._handleRemoveCard = handleRemoveCard;
  }

  open = (element, elementId) => {
    super.open();
    this._element = element;
    this._elementId = elementId;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitButton);
  }

  _handleSubmitButton = (evt) => {
    evt.preventDefault();
    this._handleRemoveCard(this._element, this._elementId);
    this.close(); 
  }
}

export default PopupWhithСonsent;