class Card {
  constructor({ link, name, owner, likes, _id }, templateCardSelector, handleClickImg, idUser, handleClickButtonDelete, handleClickButtonLike) {
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
    this._handleClickButtonLike = handleClickButtonLike;
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
  };

  _addListenersCard = () => {
    // слушатели like
    this._buttonLike.addEventListener('click', () => this._handleClickButtonLike(this));
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

  _isLiked = () => {
    return this._likesArray.some((authorLike) => {
      return authorLike._id === this._idUser;
    })
  }

  checkLike = () => {
    if (this._isLiked()) {
      this._buttonLike.classList.add('card__button-like_active');
    } else {
      this._buttonLike.classList.remove('card__button-like_active');
    }
  }

  setCountLikes = () => {
    this._counterLikesElement.textContent = this._likesArray.length;
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
    this.setCountLikes();
    this.checkLike();
    this._checkAuthorCard();
    this._setEventListeners();
    return this._cardElement
  }


}

export default Card;
