import "./index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";

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

const popupWithImage = new PopupWithImage(".popup_type_image");

function createCard(item) {
    const card = new Card(
        item,
        (name, link) => {
            popupWithImage.open(name, link);
        },
        ".cards-template"
    );
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(createCard(item));
        },
    },
    cardListContainer
);

cardList.renderItems();

popupWithImage.setEventListeners();

// форма добавления карточек

const PopupAddCard = new PopupWithForm(".popup_type_add-card", (formData) => {
    cardList.addNewCard(createCard(formData));
    PopupAddCard.close();
});
PopupAddCard.setEventListeners();

// редактирование профиля

const userInfo = new UserInfo(".profile__name", ".profile__job");

const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    userInfo.setUserInfo(formData["nameInput"], formData["jobInput"]);
    popupEdit.close();
});

popupEdit.setEventListeners();

// СЛУШАТЕЛИ СОБЫТИЙ

popupEditOpenButton.addEventListener("click", () => {
    popupEdit.open();
    const currentInfo = userInfo.getUserInfo();
    nameInput.value = currentInfo.name;
    jobInput.value = currentInfo.job;
    // сброс валидации при новом открытии
    profileEditFormValidator.clearErrorsOnOpening();
});

popupAddCardOpenButton.addEventListener("click", () => {
    PopupAddCard.open();
    // сброс валидации при новом открытии
    cardAddingFormValidator.disableButton();
    cardAddingFormValidator.clearErrorsOnOpening();
});

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
    headers: {
        "content-type": "application/json",
        authorization: "dec93d61-0cc9-4efe-ab10-1321bb5cdf78",
    },
});