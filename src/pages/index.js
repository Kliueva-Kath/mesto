import "./index.css";

import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
    nameInput,
    jobInput,
    popupChangeAvatarOpenButton,
    // placeInput,
    // urlInput,
    popupAddCardOpenButton,
    popupEditOpenButton,
    config,
    // initialCards,
    cardListContainer,
    userName,
    userJob,
    userAvatar,
} from "../utils/constants.js";

// экземпляр класса Api для запросов
const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-43",
    headers: {
        "content-type": "application/json",
        authorization: "dec93d61-0cc9-4efe-ab10-1321bb5cdf78",
    },
});

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

const avatarChangeFormValidator = new FormValidator(
    config,
    document.forms.avatarChangeForm
);
avatarChangeFormValidator.enableValidation();

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

/* const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            cardList.addItem(createCard(item));
        },
    },
    cardListContainer
); 

cardList.renderItems(); */

popupWithImage.setEventListeners();

// форма добавления карточек

const PopupAddCard = new PopupWithForm(".popup_type_add-card", (formData) => {
    cardList.addNewCard(createCard(formData));
    PopupAddCard.close();
});
PopupAddCard.setEventListeners();

// редактирование профиля

const userInfo = new UserInfo(
    ".profile__name",
    ".profile__job",
    ".profile__avatar"
);

const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    api
        .editUserInfo(formData["nameInput"], formData["jobInput"])
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            popupEdit.close();
        })
        .catch((err) => {
            console.log(err);
        });
});

popupEdit.setEventListeners();

// попап измения аватара
const popupChangeAvatar = new PopupWithForm(
    ".popup_type_change-avatar",
    (formData) => {
        api
            .editAvatar(formData["avatarInput"])
            .then((res) => {
                userInfo.changeAvatar(res.avatar);
                popupChangeAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
);

popupChangeAvatar.setEventListeners();

// СЛУШАТЕЛИ СОБЫТИЙ

popupChangeAvatarOpenButton.addEventListener("click", () => {
    popupChangeAvatar.open();
    avatarChangeFormValidator.disableButton();
    avatarChangeFormValidator.clearErrorsOnOpening();
});

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

// соединение инфо о пользователе с сервером

api
    .getUserInfo()
    .then((userInfo) => {
        userName.textContent = userInfo.name;
        userJob.textContent = userInfo.about;
        userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    });

// загрузка изначальных карточек
api
    .getInitialCards()
    .then((cards) => {
        const cardList = new Section({
                items: cards,
                renderer: (item) => {
                    cardList.addItem(createCard(item));
                },
            },
            cardListContainer
        );

        cardList.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });