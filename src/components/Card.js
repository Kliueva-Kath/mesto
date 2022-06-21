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
        this.likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
        this._id = data._id;
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
        if (this.isLiked()) {
            this._likeButton.classList.add("element__like_active");
        }
        this._photo = this._element.querySelector(".element__photo");
        this._deleteButton = this._element.querySelector(".element__delete-button");
        this._photo.src = this._link;
        this._element.querySelector(".element__title").textContent = this._name;
        this._photo.alt = this._name;
        if (this._ownerId === this._cardOwnerId) {
            this._deleteButton.classList.add("element__delete-button_visible");
        }
        this.setLikesCounter(this.likes);
        this._setEventListeners();
        return this._element;
    }

    // получение id карточки
    getId() {
        return this._id;
    }

    // метод удаления карточки, передаваемый в коллбэк
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    // установка счетчика лайков
    setLikesCounter(likes) {
        this._likeCounter = this._element.querySelector(".element__likes-count");
        this._likeCounter.textContent = likes.length;
    }

    //метод добавления лайка
    addLike(likes) {
        this._likeButton.classList.add("element__like_active");
        this.isLiked(true);
        this.setLikesCounter(likes);
    }

    // метод удаления лайка
    deleteLike(likes) {
        this._likeButton.classList.remove("element__like_active");
        this.isLiked(false);
        this.setLikesCounter(likes);
    }

    // проверка наличия лайка
    isLiked() {
        return this.likes.find((like) => like._id === this._ownerId);
    }

    // слушатели событий
    _setEventListeners() {
        // событие удаления карточки
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteCard(this);
        });

        // событие лайка
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick(this);
        });

        // событие открытия попапа
        this._photo.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}