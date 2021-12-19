class Card {
  constructor({ link, name, owner, likes, _id }, templateCardSelector, handleClickImg, idUser, handleClickButtonDelete) {
    this._newCard = document.querySelector(templateCardSelector).content;
    this._cardElement = this._newCard.querySelector('.card').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._buttonLike = this._cardElement.querySelector('.card__button-like');
    this._buttonTrash = this._cardElement.querySelector('.card__button-trash');
    this._counterLikesElement = this._cardElement.querySelector('.card__counter-like');
    this._newCardLink = link;
    this._newCardName = name;
    this._handleClickImg = handleClickImg;
    this._handleClickButtonDelete = handleClickButtonDelete;
    this._idUser = idUser;
    this._idOwnerCard = owner._id;
    this._likesArray = likes;
    this._idCard = _id;
  }

  // наполнение информацией
  _packCard = () => {
    this._cardImage.src = this._newCardLink;
    this._cardImage.alt = this._newCardName;
    this._cardTitle.textContent = this._newCardName;
    this._counterLikesElement.textContent = this._likesArray.length;

  };

  _addListenersCard = () => {
    // слушатели like
    this._buttonLike.addEventListener('click', this._handleClickButtonLike);
    // слушатели trash
    if (this._idUser === this._idOwnerCard) {
      this._buttonTrash.addEventListener('click', this._handleRemoveCard);
    }
  }

  _addListenerToImage = () => {
    this._cardImage.addEventListener('click', () => {
      this._handleClickImg({
        link: this._newCardLink,
        name: this._newCardName
      })
    });
  }

  _handleRemoveCard = () => {
    this._handleClickButtonDelete(this._cardElement, this._idCard)
  }

  _handleClickButtonLike = () => {
    this._buttonLike.classList.toggle('card__button-like_active');
  }

  _setEventListeners = () => {
    this._addListenersCard();
    this._addListenerToImage();
  }

  _checkAuthorCard() {
    if (this._idUser !== this._idOwnerCard) {
      this._buttonTrash.remove();
    } 
  }

  createCard = () => {
    this._packCard();
    this._checkAuthorCard();
    this._setEventListeners();
    return this._cardElement
  }


}

export default Card;
