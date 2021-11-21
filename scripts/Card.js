class Card {
  constructor(cardData, templateCardSelector, handleClickImg) {
    this.formCard = document.querySelector(templateCardSelector).content;
    this.cardElement = this.formCard.querySelector('.card').cloneNode(true);
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardTitle = this.cardElement.querySelector('.card__title');
    this.buttonLike = this.cardElement.querySelector('.card__button-like');
    this.buttonTrash = this.cardElement.querySelector('.card__button-trash');
    this.newCardLink = cardData.link;
    this.newCardName = cardData.name;
    this._handleClickImg = handleClickImg;
  }

  _packCard = () => {
    // наполнение информацией
    this.cardImage.src = this.newCardLink;
    this.cardImage.alt = this.newCardName;
    this.cardTitle.textContent = this.newCardName;
  };
 
  _getDataCard =() => {
  const dataCard = {
    link: this.newCardLink,
    name: this.newCardName
  }
    return this.dataCard; 
  }

  _listenerCard = () => {
  // слушатели like
  this.buttonLike.addEventListener('click', this._handlerButtonLike);

  // слушатели trash
  this.buttonTrash.addEventListener('click', this._handlerRemoveCard);
  this.cardImage.addEventListener('click', () => {
    this._handleClickImg({
      link: this.newCardLink,
      name: this.newCardName
    })
  }); //разобраться с обработчиком
  }

  _handlerRemoveCard = () => {
    this.cardElement.remove();
  }

  _handlerButtonLike = () => {
    this.buttonLike.classList.toggle('card__button-like_active');
  }

  createCard = () => {
    this._packCard();
    this._listenerCard();
    return this.cardElement
  }
}

export default Card;