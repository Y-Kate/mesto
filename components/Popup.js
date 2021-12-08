class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open = () => {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickPopup);
  };

  _handleClickPopup = (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
      this.close();
    }
  };
}

export default Popup;