import { openPopup, closePopup } from "./index.js";

// НАЧАЛЬНЫЕ КАРТОЧКИ
const initialCards = [{
        name: "Байкал",
        link: "https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80",
    },
    {
        name: "Карелия",
        link: "https://images.unsplash.com/photo-1573156667788-3b0a869a97b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    },
    {
        name: "Красноярск",
        link: "https://images.unsplash.com/photo-1597125760773-b0166e249ea7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
    },
    {
        name: "Новосиль",
        link: "https://images.unsplash.com/photo-1444894423756-1bb106dce5a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=771&q=80",
    },
    {
        name: "Тулиновка",
        link: "https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    },
    {
        name: "Владивосток",
        link: "https://images.unsplash.com/photo-1563941433-b6a094653ed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=433&q=80",
    },
];

const imagePopup = document.querySelector(".popup_type_image");
const openedImage = imagePopup.querySelector(".image__close-up");
const openedImageTitle = imagePopup.querySelector(".image__title");
const imagePopupExitIcon = imagePopup.querySelector(".popup__close-icon");

class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
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

    // открытие попапа картинки
    _handleOpenPopup() {
        openedImage.src = this._link;
        openedImageTitle.textContent = this._name;
        openedImage.alt = this._name;
        openPopup(imagePopup);
    }

    // закрытие попапа картинки
    _handleClosePopup() {
        closePopup(imagePopup);
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
                this._handleOpenPopup();
            });

        // событие закрытия попапа
        imagePopupExitIcon.addEventListener("click", () => {
            this._handleClosePopup();
        });
    }
}

// добавление карточек на страницу

initialCards.forEach((item) => {
    const card = new Card(item, ".cards-template");
    const cardElement = card.generateCard();

    document.querySelector(".elements__container").append(cardElement);
});