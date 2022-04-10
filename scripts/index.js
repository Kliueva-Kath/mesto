// НАСТРОЙКА ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// сам попап редактирования
const editPopup = document.querySelector(".popup_type_edit");

// Форма и поля ввода - редактирование профиля
const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.querySelector(".input__text_type_name");
const jobInput = profileEditForm.querySelector(".input__text_type_job");

// элемены имени и информации о себе в профиле
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// кнопка открытия попапа редактирования (кнопка редактирования)
const openPopupButton = document.querySelector(".profile__edit-button");

// кнопка закрытия попапа редактирования
const closePopupButton = document.querySelector(".popup__close-icon");

// открытие попапа

function openPopup() {
  editPopup.classList.add("popup_opened");
  // значения в полях ввода по умолчанию - текущие данные профиля
  nameInput.defaultValue = profileName.textContent;
  jobInput.defaultValue = profileJob.textContent;
}
openPopupButton.addEventListener("click", openPopup);

// закрытие попапа

function closePopup() {
  popup.classList.remove("popup_opened");
}
closePopupButton.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEditForm.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
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
