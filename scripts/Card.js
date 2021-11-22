import { handleClickImg } from "./index.js";

class Card {
  constructor({ link, name }, templateCardSelector) {
    this._formCard = document.querySelector(templateCardSelector).content;
    this._cardElement = this._formCard.querySelector('.card').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._buttonLike = this._cardElement.querySelector('.card__button-like');
    this._buttonTrash = this._cardElement.querySelector('.card__button-trash');
    this._newCardLink = link;
    this._newCardName = name;
  }

  _packCard = () => {
    // наполнение информацией
    this._cardImage.src = this._newCardLink;
    this._cardImage.alt = this._newCardName;
    this._cardTitle.textContent = this._newCardName;
  };

  _addListenersCard = () => {
  // слушатели like
  this._buttonLike.addEventListener('click', this._handleClickButtonLike);

  // слушатели trash
  this._buttonTrash.addEventListener('click', this._handleRemoveCard);

  }

  _addListenerToImage = () => {
    this._cardImage.addEventListener('click', () => {
      handleClickImg({
        link: this._newCardLink,
        name: this._newCardName
      })
    });
  }

  _handleRemoveCard = () => {
    this._cardElement.remove();
  }

  _handleClickButtonLike = () => {
    this._buttonLike.classList.toggle('card__button-like_active');
  }

  createCard = () => {
    this._packCard();
    this._addListenersCard();
    this._addListenerToImage();
    return this._cardElement
  }
}

export default Card;
