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

  // функции для карточек
  createCard = (card) => {
    // наполнение информацией
    this.cardImage.src = this.newCardLink;
    this.cardImage.alt = this.newCardName;
    this.cardTitle.textContent = this.newCardName;

    // слушатели like
    this.buttonLike.addEventListener('click', () => {
      this.buttonLike.classList.toggle('card__button-like_active');
    });

    // слушатели trash
    this.buttonTrash.addEventListener('click', () => {
      this.cardElement.remove();
    });

    this.cardImage.addEventListener('click', handleClickImg); //разобраться с обработчиком

    return cardElement;
  };

  renderCard(card) {
    catalogCards.prepend(card);
  };

}
