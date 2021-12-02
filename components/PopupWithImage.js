class PopupWithImage extends Popup {
  constructor( data,popupSelector) {
    super(popupSelector);
    this._popup =document.querySelector(super(popupSelector));
    this._dataCardSrc = data.link;
    this._dataCardAlt = data.name;
    this._figcaptionPopup = this._dataCardAlt;
  }

  open = (data) => {
    this._dataCardSrc;
    this._dataCardAlt;
    this._figcaptionPopup;
    this._popup.classList.add('popup_opened');
  };



}

// export function handleClickImg (dataCard) {
//   imageInPopup.src = dataCard.link;
//   imageInPopup.alt = dataCard.name;
//   figcaptionPopup.textContent = dataCard.name;
//   openPopup(popupWithImage);
// }
