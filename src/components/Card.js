import { data } from "autoprefixer";

export default class Card {
    constructor({ data, ownerId, handleCardClick, handleDeleteCard, handleLikeClick },
        cardSelector
    ) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._cardOwnerId = data.owner._id;
        this._ownerId = ownerId;
        this._likeCounter = [];
        this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
        this._id = data._id;
        //  this._deleteButton = this._element.querySelector(".element__delete-button");
    }

    // получение разметки template-элемента и вставка данных в разметку

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".element")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector(".element__like");
        if (this.isLiked) {
            this._likeButton.classList.add("element__like_active");
        }
        this._photo = this._element.querySelector(".element__photo");
        this._photo.src = this._link;
        this._element.querySelector(".element__title").textContent = this._name;
        this._photo.alt = this._name;
        this._showDeleteButton;
        this._likeCounter.textContent = this._likes.length;

        this._setEventListeners();
        return this._element;
    }

    // удаление карточки

    getId() {
        return this._id;
    }

    handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    addLike(likes) {
        this._likeButton.classList.add("element__like_active");
        this._likeCounter.textContent = likes.length;
    }
    deleteLike(likes) {
        this._likeButton.classList.remove("element__like_active");
        this._likeCounter.textContent = likes.length;
    }

    isLiked() {
        return this._likes.find((like) => like._id === this._ownerId);
    }

    _showDeleteButton() {
        if (this._ownerId === this._cardOwnerId) {
            this._element
                .querySelector(".element__delete-button")
                .classList.add(".element__delete-button_visible");
        }
    }

    // слушатели событий

    _setEventListeners() {
        // событие удаления карточки

        this._element
            .querySelector(".element__delete-button")
            .addEventListener("click", () => {
                this._handleDeleteCard(this);
            });

        // событие лайка

        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick();
        });

        // событие открытия попапа
        this._photo.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    // создание карточки
}