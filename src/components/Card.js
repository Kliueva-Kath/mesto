export default class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
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

    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__photo").alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  // удаление карточки

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLikePost() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  // слушатели событий

  _setEventListeners() {
    // событие удаления карточки
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // событие лайка
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikePost();
      });

    // событие открытия попапа
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }
}
