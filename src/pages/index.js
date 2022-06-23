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

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute("name");

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

// попап просмотра изображений
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

// попап подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(
    ".popup_type_delete-card"
);
popupWithConfirmation.setEventListeners();

// переменная со значением id нашего пользователя
let userId;

// правило, чтобы карточки не прогружались раньше получения данных о пользователе
Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardData]) => {
        userInfo.setUserInfo(
            userData.name,
            userData.about,
            userData.avatar,
            userData._id
        );
        userId = userData._id;
        cardList.renderItems(cardData, userData._id);
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
                    api
                        .deleteCard(card.getId())
                        .then(() => {
                            card.deleteCard();
                            popupWithConfirmation.close();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            },
            handleLikeClick: () => {
                if (card.isLiked()) {
                    api
                        .deleteLike(card.getId())
                        .then((res) => {
                            card.deleteLike(res.likes);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    api
                        .addLike(card.getId())
                        .then((res) => {
                            card.addLike(res.likes);
                        })
                        .catch((err) => {
                            console.log(err);
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
            userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
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
    formValidators["avatarChangeForm"].disableButton();
    formValidators["avatarChangeForm"].clearErrors();
});

popupEditOpenButton.addEventListener("click", () => {
    popupEdit.open();
    const currentInfo = userInfo.getUserInfo();
    nameInput.value = currentInfo.name;
    jobInput.value = currentInfo.job;
    userAvatar.style.backgroundImage = currentInfo.avatar;
    // сброс валидации при новом открытии
    formValidators["profileEditForm"].clearErrors();
});

popupAddCardOpenButton.addEventListener("click", () => {
    popupAddCard.open();
    // сброс валидации при новом открытии
    formValidators["addCardForm"].disableButton();
    formValidators["addCardForm"].clearErrors();
});