class Card {
  constructor(cardData, templateCardSelector) {
    this.formCard = document.querySelector(templateCardSelector).content;
    this.cardElement = this.formCard.querySelector('.card').cloneNode(true);
    this.cardImage = this.cardElement.querySelector('.card__image');
    this.cardTitle = this.cardElement.querySelector('.card__title');
    this.buttonLike = this.cardElement.querySelector('.card__button-like');
    this.buttonTrash = this.cardElement.querySelector('.card__button-trash');
    this.newCardLink = cardData.link;
    this.newCardName = cardData.name;
  }

  _packCard = () => {
    // наполнение информацией
    this.cardImage.src = this.newCardLink;
    this.cardImage.alt = this.newCardName;
    this.cardTitle.textContent = this.newCardName;
    //работает с одной

    // слушатели like
    this.buttonLike.addEventListener('click', () => {
      this.buttonLike.classList.toggle('card__button-like_active');
    });
    //работает с одной

    // слушатели trash
    this.buttonTrash.addEventListener('click', () => {
      this.cardElement.remove();
    });
    //работает с одной

    // this.cardImage.addEventListener('click', handleClickImg); //разобраться с обработчиком

  };
 
  createCard = () => {
    console.log('1', this.cardElement);
    this._packCard();
    console.log('2', this.cardElement);
    return this.cardElement
  }

}

export default Card;