// DOM-ЭЛЕМЕНТЫ

// КАРТОЧКИ
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

const cardsContainer = document.querySelector(".elements__container");
const cardsTemplate = document.querySelector(".cards-template");

// ПОПАП РЕДАКТИРОВАНИЯ
const editPopup = document.querySelector(".popup_type_edit");

const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.querySelector(".input__text_type_name");
const jobInput = profileEditForm.querySelector(".input__text_type_job");

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// ПОПАП  ДОБАВЛЕНИЯ КАРТОЧЕК
const addPopup = document.querySelector(".popup_type_add-card");

// ПОПАП ПРОСМОТРА КАРТИНКИ
const imagePopup = document.querySelector(".popup_type_image");
const openedImage = imagePopup.querySelector(".image");
const openedImageTitle = imagePopup.querySelector(".image__title");

// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
const closeEditPopupButton = editPopup.querySelector(".popup__close-icon");
const closeAddCardPopupButton = addPopup.querySelector(".popup__close-icon");
const closeImagePopupButton = imagePopup.querySelector(".popup__close-icon");
const openAddCardPopupButton = document.querySelector(".profile__add-button");
const openEditPopupButton = document.querySelector(".profile__edit-button");
const openImagePopup = document.querySelector(".element__photo");

function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = cardsTemplate.content.cloneNode(true);
  const cardTitle = getElementTemplate.querySelector(".element__title");
  const cardLink = getElementTemplate.querySelector(".element__photo");
  const deleteButton = getElementTemplate.querySelector(
    ".element__delete-button"
  );
  cardTitle.textContent = item.name;
  cardLink.src = item.link;
  deleteButton.addEventListener("click", deleteCard);
  return getElementTemplate;
}

function deleteCard(evt) {
  const card = evt.target.closest(".element");
  card.remove();
}

// функция добавления карточки
function addFormHandler(evt) {
  evt.preventDefault();
  const addCardForm = document.forms.addCardForm;
  const placeInputValue = addCardForm.querySelector(
    ".input__text_type_place"
  ).value;
  const linkInputValue = addCardForm.querySelector(
    ".input__text_type_link"
  ).value;
  const card = getElement({ name: placeInputValue, link: linkInputValue });
  cardsContainer.prepend(card);
  addPopup.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
addCardForm.addEventListener("submit", addFormHandler);

render();

// НАСТРОЙКА ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// открытие попапа редактирования
function openEditPopup() {
  editPopup.classList.add("popup_opened");
  // значения в полях ввода по умолчанию - текущие данные профиля
  nameInput.defaultValue = profileName.textContent;
  jobInput.defaultValue = profileJob.textContent;
}
openEditPopupButton.addEventListener("click", openEditPopup);

// Обработчик «отправки» формы
function editFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  editPopup.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
profileEditForm.addEventListener("submit", editFormHandler);

// открытие попапа добавления карточек
function openAddCardPopup() {
  addPopup.classList.add("popup_opened");
}
openAddCardPopupButton.addEventListener("click", openAddCardPopup);

function closePopup(evt) {
  const closeButton = evt.target.closest(".popup");
  closeButton.classList.remove("popup_opened");
}

closeEditPopupButton.addEventListener("click", closePopup);
closeAddCardPopupButton.addEventListener("click", closePopup);
closeImagePopupButton.addEventListener("click", closePopup);

//  ПОПАП ПРОСМОТРА КАРТИНКИ

const card = document.querySelectorAll(".element");

function openPopup(card) {
  const openedImage = imagePopup.querySelector(".image");
  const openedImageTitle = imagePopup.querySelector(".image__title");
  // const clickedImage = card.querySelector(".element__photo");
  //  const clickedImageTitle = card.querySelector(".element__title");
  imagePopup.classList.add("popup_opened");
  openedImage.src = card.link;
  openedImageTitle.textContent = card.name;
}
openImagePopup.addEventListener("click", openPopup);

// открываем попап по клику на картинку (.element__photo) - через event target
// в отображении попапа image__close-up = element__photo,
// а image__title = element__title
