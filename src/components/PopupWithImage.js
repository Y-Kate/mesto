import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor( popupSelector ) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._figcaptionPopup = this._popup.querySelector('.popup__figcaption');
  }

  open = ( { link, name } ) => {
    this._imagePopup.src = link;
    this._imagePopup.alt = name;
    this._figcaptionPopup.textContent = name;
    super.open();
  };
}

export default PopupWithImage;