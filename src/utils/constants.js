// ПЕРЕМЕННЫЕ

// форма редактирования
export const profileEditForm = document.forms.profileEditForm;
export const nameInput = profileEditForm.elements.nameInput;
export const jobInput = profileEditForm.elements.jobInput;

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
  errorClass: "form__input-error_visible"
};

// изначальные карточки
export const initialCards = [
  {
    name: "Байкал",
    link:
      "https://images.unsplash.com/photo-1551845041-63e8e76836ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80"
  },
  {
    name: "Карелия",
    link:
      "https://images.unsplash.com/photo-1573156667788-3b0a869a97b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
  },
  {
    name: "Красноярск",
    link:
      "https://images.unsplash.com/photo-1597125760773-b0166e249ea7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
  },
  {
    name: "Новосиль",
    link:
      "https://images.unsplash.com/photo-1444894423756-1bb106dce5a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=771&q=80"
  },
  {
    name: "Тулиновка",
    link:
      "https://images.unsplash.com/photo-1516128935666-9742cf27e24c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
  },
  {
    name: "Владивосток",
    link:
      "https://images.unsplash.com/photo-1563941433-b6a094653ed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=433&q=80"
  }
];

export const cardListContainer = ".elements__container";

// поля с данными пользователя
export const userName = document.querySelector(".profile__name");
export const userJob = document.querySelector(".profile__job");
