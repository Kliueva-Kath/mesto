export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteCard,
      handleAddLike,
      handleDeleteLike
    },
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likeCounter = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  // получение разметки template-элемента и вставка данных в разметку

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // создание карточки

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._photo = this._element.querySelector(".element__photo");
    this._photo.src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    this._photo.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  // удаление карточки

  handleDeleteCard() {
    this._deleteCard(this._element);
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  addLike() {
    this._likeButton.classList.add("element__like_active");
    this._likeCounter = 
  }

  deleteLike() {}

  checkOwner(ownerId) {}

  // слушатели событий

  _setEventListeners() {
    // событие удаления карточки
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // событие лайка

    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });

    // событие открытия попапа
    this._photo.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
