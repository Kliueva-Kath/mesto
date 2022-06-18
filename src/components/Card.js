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
    this._likeCounter = [];
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._deleteButton = this._element.querySelector(".element__delete-button");
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
    this._element.remove();
    this._element = null;
  }

  setLikeCounter(data) {
    this._likeCounter = data.likes.length;
  }

  _handleAddLike() {
    this._likeButton.classList.add("element__like_active");
  }

  _handleDeleteLike() {
    this._likeButton.classList.remove("element__like_active");
  }

  checkOwner(ownerId, data) {
    if (ownerId === data.owner._id) {
    }
  }

  // слушатели событий

  _setEventListeners() {
    // событие удаления карточки
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    // событие лайка

    this._likeButton.addEventListener("click", () => {
      if (this._likebutton.classList.contains("element__like_active")) {
        this._handleAddLike();
      } else {
        this._handleDeleteLike();
      }
    });

    // событие открытия попапа
    this._photo.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
