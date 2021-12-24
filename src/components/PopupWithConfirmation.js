import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor( popupSelector, handleRemoveCard ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form-popup');
    this._handleRemoveCard = handleRemoveCard;
  }

  open = (card) => {
    super.open();
    this._card = card;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitButton);
  }

  _handleSubmitButton = (evt) => {
    evt.preventDefault();
    this._handleRemoveCard(this._card);
  }
}

export default PopupWithConfirmation;