// import { openPopup, closePopup } from "../utils/utils.js";
// import { imagePopup } from "../utils/constants.js";
export default class Card {
    constructor({ data, handleCardClick }, cardSelector) {
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

        this._handleCardClick.bind(this);
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

    /*     // открытие попапа картинки
                                    _handleOpenPopup() {
                                        const openedImage = document.querySelector(".image__close-up");
                                        const openedImageTitle = document.querySelector(".image__title");

                                        openedImage.src = this._link;
                                        openedImageTitle.textContent = this._name;
                                        openedImage.alt = this._name;
                                        openPopup(imagePopup);
                                    } */

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
        // this._handleCardClick();
        /* this._element
                                                                    .querySelector(".element__photo")
                                                                    .addEventListener("click", () => {
                                                                        this._handleOpenPopup();
                                                                    }); */
    }
}