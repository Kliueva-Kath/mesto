// DOM-ЭЛЕМЕНТЫ

// КАРТОЧКИ
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

const cardsContainer = document.querySelector(".elements__container");
const cardsTemplate = document.querySelector(".cards-template");

// ПОПАП РЕДАКТИРОВАНИЯ
const editPopup = document.querySelector(".popup_type_edit");

// ФОРМА РЕДАКТИРОВАНИЯ
const profileEditForm = document.forms.profileEditForm;
const nameInput = profileEditForm.elements.nameInput;
const jobInput = profileEditForm.elements.jobInput;

// ФОРМА ДОБАВЛЕНИЯ
const addCardForm = document.forms.addCardForm;
const placeInput = addCardForm.elements.placeInput;
const urlInput = addCardForm.elements.urlInput;

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// ПОПАП  ДОБАВЛЕНИЯ КАРТОЧЕК
const addPopup = document.querySelector(".popup_type_add-card");

// ПОПАП ПРОСМОТРА КАРТИНКИ
const imagePopup = document.querySelector(".popup_type_image");
const openedImage = imagePopup.querySelector(".image__close-up");
const openedImageTitle = imagePopup.querySelector(".image__title");

// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
const closeEditPopupButton = editPopup.querySelector(".popup__close-icon");
const closeAddCardPopupButton = addPopup.querySelector(".popup__close-icon");
const closeImagePopupButton = imagePopup.querySelector(".popup__close-icon");

const openAddCardPopupButton = document.querySelector(".profile__add-button");
const openEditPopupButton = document.querySelector(".profile__edit-button");

// ФУНКЦИИ

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
    const likeButton = getElementTemplate.querySelector(".element__like");

    cardTitle.textContent = item.name;
    cardLink.src = item.link;
    cardLink.alt = item.name;
    deleteButton.addEventListener("click", deleteCard);
    likeButton.addEventListener("click", function(evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle("element__like_active");
    });
    cardLink.addEventListener("click", () => openImagePopup(item));
    return getElementTemplate;
}

function openImagePopup(element) {
    openedImage.src = element.link;
    openedImageTitle.textContent = element.name;
    openedImage.alt = element.name;
    openPopup(imagePopup);
}

function deleteCard(evt) {
    const card = evt.target.closest(".element");
    card.remove();
}

function addFormHandler(evt) {
    evt.preventDefault();
    const placeInputValue = addCardForm.elements.placeInput.value;
    const linkInputValue = addCardForm.elements.urlInput.value;
    const card = getElement({ name: placeInputValue, link: linkInputValue });
    cardsContainer.prepend(card);
    closePopup(addPopup);
    addCardForm.reset();
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEsc);
}

function editFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(editPopup);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEsc);
}

render();

// СЛУШАТЕЛИ СОБЫТИЙ

addCardForm.addEventListener("submit", addFormHandler);

openEditPopupButton.addEventListener("click", () => {
    clearInputErrors();
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

openAddCardPopupButton.addEventListener("click", () => {
    clearInputErrors();
    openPopup(addPopup);
    placeInput.value = "";
    urlInput.value = "";
});

profileEditForm.addEventListener("submit", editFormHandler);

closeEditPopupButton.addEventListener("click", () => closePopup(editPopup));
closeAddCardPopupButton.addEventListener("click", () => closePopup(addPopup));
closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

// закрытие через кнопку esc
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}

const overlays = Array.from(document.querySelectorAll(".popup"));

overlays.forEach((overlay) => {
    overlay.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(document.querySelector(".popup_opened"));
        }
    });
});