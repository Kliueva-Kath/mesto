// ПЕРЕМЕННЫЕ

// форма редактирования
export const profileEditForm = document.forms.profileEditForm;
export const nameInput = profileEditForm.elements.nameInput;
export const jobInput = profileEditForm.elements.jobInput;

// форма изменения аватара

export const popupChangeAvatarOpenButton = document.querySelector(
    ".profile__avatar-edit"
);

// форма добавления карточки
export const cardAddingForm = document.forms.addCardForm;
export const placeInput = cardAddingForm.elements.placeInput;
export const urlInput = cardAddingForm.elements.urlInput;

// кнопки открытия попапов с формами
export const popupAddCardOpenButton = document.querySelector(
    ".profile__add-button"
);
export const popupEditOpenButton = document.querySelector(
    ".profile__edit-button"
);

// данные для валидации форм
export const config = {
    inputSelector: ".form__input",
    buttonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
};

// поля с данными пользователя
export const userName = document.querySelector(".profile__name");
export const userJob = document.querySelector(".profile__job");
export const userAvatar = document.querySelector(".profile__avatar");