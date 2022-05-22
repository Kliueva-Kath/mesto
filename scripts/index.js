import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { openPopup, closePopup, imagePopup } from "./utils.js";

// ПЕРЕМЕННЫЕ

const cardsContainer = document.querySelector(".elements__container");

// ПОПАП РЕДАКТИРОВАНИЯ
const popupEdit = document.querySelector(".popup_type_edit");

// ФОРМА РЕДАКТИРОВАНИЯ
const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.elements.nameInput;
const jobInput = profileEditForm.elements.jobInput;

// ФОРМА ДОБАВЛЕНИЯ
const cardAddingForm = document.forms.addCardForm;
const placeInput = cardAddingForm.elements.placeInput;
const urlInput = cardAddingForm.elements.urlInput;

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// ПОПАП  ДОБАВЛЕНИЯ КАРТОЧЕК
const popupAddCard = document.querySelector(".popup_type_add-card");

// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
const popupEditExitIcon = popupEdit.querySelector(".popup__close-icon");
const popupAddCardExitIcon = popupAddCard.querySelector(".popup__close-icon");
const imagePopupExitIcon = imagePopup.querySelector(".popup__close-icon");

const popupAddCardOpenButton = document.querySelector(".profile__add-button");
const popupEditOpenButton = document.querySelector(".profile__edit-button");

const overlays = Array.from(document.querySelectorAll(".popup"));

// ВАЛИДАЦИЯ

// данные для валидации форм
const config = {
    inputSelector: ".form__input",
    buttonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
};

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

initialCards.forEach((item) => {
    const card = new Card(item, ".cards-template");
    const cardElement = card.generateCard();
    document.querySelector(".elements__container").append(cardElement);
});

// создание новых карточек через форму

function addFormHandler(evt) {
    evt.preventDefault();
    // создание новой карточки
    const placeInputValue = placeInput.value;
    const linkInputValue = urlInput.value;
    const cardNew = new Card({ name: placeInputValue, link: linkInputValue },
        ".cards-template"
    );
    const cardGenerated = cardNew.generateCard();
    cardsContainer.prepend(cardGenerated);

    closePopup(popupAddCard);
    cardAddingForm.reset();
}

function editFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

// СЛУШАТЕЛИ СОБЫТИЙ

popupEditOpenButton.addEventListener("click", () => {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // сброс валидации при новом открытии
    profileEditFormValidator.clearErrorsOnOpening(nameInput);
    profileEditFormValidator.clearErrorsOnOpening(jobInput);
});

popupAddCardOpenButton.addEventListener("click", () => {
    openPopup(popupAddCard);
    cardAddingForm.reset();
    // сброс валидации при новом открытии
    cardAddingFormValidator.disableButtonOnOpening();
    cardAddingFormValidator.clearErrorsOnOpening(placeInput);
    cardAddingFormValidator.clearErrorsOnOpening(urlInput);
});

// закрытие кликом по оверлею
overlays.forEach((overlay) => {
    overlay.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(document.querySelector(".popup_opened"));
        }
    });
});

cardAddingForm.addEventListener("submit", addFormHandler);

profileEditForm.addEventListener("submit", editFormHandler);

popupEditExitIcon.addEventListener("click", () => closePopup(popupEdit));
popupAddCardExitIcon.addEventListener("click", () => closePopup(popupAddCard));
imagePopupExitIcon.addEventListener("click", () => closePopup(imagePopup));