import "./index.css";

import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

import {
    nameInput,
    jobInput,
    popupChangeAvatarOpenButton,
    popupAddCardOpenButton,
    popupEditOpenButton,
    config,
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

const popupWithConfirmation = new PopupWithConfirmation(
    ".popup_type_delete-card"
);
popupWithConfirmation.setEventListeners();

let userId;

Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userInfo, cardData]) => {
        userName.textContent = userInfo.name;
        userJob.textContent = userInfo.about;
        userId = userInfo._id;
        userAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
        cardList.renderItems(cardData, userInfo._id);
    })
    .catch((err) => {
        console.log(err);
    });

// функция создания карточки
function createCard(item, userId) {
    const card = new Card({
            data: item,
            ownerId: userId,
            handleCardClick: (name, link) => {
                popupWithImage.open(name, link);
            },
            handleDeleteCard: () => {
                popupWithConfirmation.open();
                popupWithConfirmation.handleDeleteCard(() => {
                    api.deleteCard(card.getId()).then(() => {
                        card.deleteCard();
                        popupWithConfirmation.close();
                    });
                });
            },
            handleLikeClick: () => {
                if (card.isLiked()) {
                    api.deleteLike(card.getId()).then((res) => {
                        card.deleteLike(res.likes);
                        card.likes = res.likes;
                    });
                } else {
                    api.addLike(card.getId()).then((res) => {
                        card.addLike(res.likes);
                        card.likes = res.likes;
                    });
                }
            },
        },
        ".cards-template"
    );
    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
        renderer: (item, userId) => {
            cardList.addItem(createCard(item, userId));
        },
    },
    ".elements__container"
);

popupWithImage.setEventListeners();

// форма добавления карточек

const popupAddCard = new PopupWithForm(".popup_type_add-card", (formData) => {
    popupAddCard.renderLoading("Сохранение...");
    api
        .addCard(formData.name, formData.link)
        .then((cardInfo) => {
            cardList.addNewCard(createCard(cardInfo, userId));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddCard.renderLoading("Создать");
        });
});
popupAddCard.setEventListeners();

// редактирование профиля

const userInfo = new UserInfo(
    ".profile__name",
    ".profile__job",
    ".profile__avatar"
);

const popupEdit = new PopupWithForm(".popup_type_edit", (formData) => {
    popupEdit.renderLoading("Сохранение...");
    api
        .editUserInfo(formData["nameInput"], formData["jobInput"])
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about);
            popupEdit.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEdit.renderLoading("Сохранить");
        });
});

popupEdit.setEventListeners();

// попап измения аватара
const popupChangeAvatar = new PopupWithForm(
    ".popup_type_change-avatar",
    (formData) => {
        popupChangeAvatar.renderLoading("Сохранение...");
        api
            .editAvatar(formData["avatarInput"])
            .then((res) => {
                userInfo.changeAvatar(res.avatar);
                popupChangeAvatar.close();
            })
            .catch((err) => {
                console.log(err);
                console.log(formData["avatarInput"]);
            })
            .finally(() => {
                popupChangeAvatar.renderLoading("Сохранить");
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
    popupAddCard.open();
    // сброс валидации при новом открытии
    cardAddingFormValidator.disableButton();
    cardAddingFormValidator.clearErrorsOnOpening();
});