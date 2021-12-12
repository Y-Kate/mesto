import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor( data, popupSelector ) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._figcaptionPopup = this._popup.querySelector('.popup__figcaption');
    this._cardLink = data.link;
    this._cardName = data.name;
  }

  open = () => {
    this._imagePopup.src = this._cardLink;
    this._imagePopup.alt = this._cardName;
    this._figcaptionPopup.textContent = this._cardName;
    super.open();
    super.setEventListeners();
  };
}

export default PopupWithImage;