class Card {
  constructor(cardData, templateCardSelector, handleClickImg) {
    this._formCard = document.querySelector(templateCardSelector).content;
    this._cardElement = this._formCard.querySelector('.card').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._buttonLike = this._cardElement.querySelector('.card__button-like');
    this._buttonTrash = this._cardElement.querySelector('.card__button-trash');
    this._newCardLink = cardData.link;
    this._newCardName = cardData.name;
    this._handleClickImg = handleClickImg;
  }

  _packCard = () => {
    // наполнение информацией
    this._cardImage.src = this._newCardLink;
    this._cardImage.alt = this._newCardName;
    this._cardTitle.textContent = this._newCardName;
  };

  _listenerCard = () => {
  // слушатели like
  this._buttonLike.addEventListener('click', this._handlerButtonLike);

  // слушатели trash
  this._buttonTrash.addEventListener('click', this._handlerRemoveCard);
  this._cardImage.addEventListener('click', () => {
    this._handleClickImg({
      link: this._newCardLink,
      name: this._newCardName
    })
  }); 
  }

  _handlerRemoveCard = () => {
    this._cardElement.remove();
  }

  _handlerButtonLike = () => {
    this._buttonLike.classList.toggle('card__button-like_active');
  }

  createCard = () => {
    this._packCard();
    this._listenerCard();
    return this._cardElement
  }
}

export default Card;