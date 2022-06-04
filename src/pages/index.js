import "./index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
    nameInput,
    jobInput,
    placeInput,
    urlInput,
    popupAddCardOpenButton,
    popupEditOpenButton,
    config,
    initialCards,
    cardListContainer,
} from "../utils/constants.js";

// ВАЛИДАЦИЯ

// подключение валидации форм

const profileEditFormValidator = new FormValidator(
    config,
    document.forms.profileEditForm
);
profileEditFormValidator.enableValidation();

const cardAddingFormValidator = new FormValidator(
    config,
    document.forms.addCardForm
);
cardAddingFormValidator.enableValidation();

// добавление карточек на страницу

const popupWithImage = new PopupWithImage(
    ".popup_type_image",
    ".popup__close-icon"
);

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card({
                    name: item.name,
                    link: item.link,
                    handleCardClick: (name, link) => {
                        popupWithImage.open(name, link);
                    },
                },
                ".cards-template"
            );
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        },
    },
    cardListContainer
);

cardList.renderItems();

popupWithImage.setEventListeners();

// форма добавления карточек

const PopupAddCard = new PopupWithForm({
    popupSelector: ".popup_type_add-card",
    closeButtonSelector: ".popup__close-icon",
    handleFormSubmit: (formData) => {
        const card = new Card({
                name: formData[(name = "placeInput")],
                link: formData[(name = "urlInput")],
                handleCardClick: (name, link) => {
                    popupWithImage.open(name, link);
                },
            },
            ".cards-template"
        );
        const cardElement = card.generateCard();
        cardList.addNewCard(cardElement);
    },
});
PopupAddCard.setEventListeners();

// редактирование профиля

const userInfo = new UserInfo(".profile__name", ".profile__job");

const popupEdit = new PopupWithForm({
    popupSelector: ".popup_type_edit",
    closeButtonSelector: ".popup__close-icon",
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData["nameInput"], formData["jobInput"]);
    },
});

popupEdit.setEventListeners();

// СЛУШАТЕЛИ СОБЫТИЙ

popupEditOpenButton.addEventListener("click", () => {
    popupEdit.open();
    const currentInfo = userInfo.getUserInfo();
    nameInput.value = currentInfo.name;
    jobInput.value = currentInfo.job;
    // сброс валидации при новом открытии
    profileEditFormValidator.clearErrorsOnOpening(nameInput);
    profileEditFormValidator.clearErrorsOnOpening(jobInput);
});

popupAddCardOpenButton.addEventListener("click", () => {
    PopupAddCard.open();
    // сброс валидации при новом открытии
    cardAddingFormValidator.disableButtonOnOpening();
    cardAddingFormValidator.clearErrorsOnOpening(placeInput);
    cardAddingFormValidator.clearErrorsOnOpening(urlInput);
});