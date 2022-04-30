// DOM-ЭЛЕМЕНТЫ

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

const overlays = Array.from(document.querySelectorAll(".popup"));

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

// закрытие через кнопку esc
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}

render();

// СЛУШАТЕЛИ СОБЫТИЙ

// закрытие кликом по оверлею

overlays.forEach((overlay) => {
    overlay.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(document.querySelector(".popup_opened"));
        }
    });
});

addCardForm.addEventListener("submit", addFormHandler);

openEditPopupButton.addEventListener("click", () => {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    toggleButtonState(profileEditForm, config);
    checkInputValidity(profileEditForm, nameInput, config);
    checkInputValidity(profileEditForm, jobInput, config);
});

openAddCardPopupButton.addEventListener("click", () => {
    openPopup(addPopup);
    placeInput.value = "";
    urlInput.value = "";
    toggleButtonState(addCardForm, config);
});

profileEditForm.addEventListener("submit", editFormHandler);

closeEditPopupButton.addEventListener("click", () => closePopup(editPopup));
closeAddCardPopupButton.addEventListener("click", () => closePopup(addPopup));
closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));