// DOM-ЭЛЕМЕНТЫ

const cardsContainer = document.querySelector(".elements__container");
const cardsTemplate = document.querySelector(".cards-template");

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

// ПОПАП ПРОСМОТРА КАРТИНКИ
const imagePopup = document.querySelector(".popup_type_image");
const openedImage = imagePopup.querySelector(".image__close-up");
const openedImageTitle = imagePopup.querySelector(".image__title");

// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
const popupEditExitIcon = popupEdit.querySelector(".popup__close-icon");
const popupAddCardExitIcon = popupAddCard.querySelector(".popup__close-icon");
const imagePopupExitIcon = imagePopup.querySelector(".popup__close-icon");

const popupAddCardOpenButton = document.querySelector(".profile__add-button");
const popupEditOpenButton = document.querySelector(".profile__edit-button");

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
    const placeInputValue = cardAddingForm.elements.placeInput.value;
    const linkInputValue = cardAddingForm.elements.urlInput.value;
    const card = getElement({ name: placeInputValue, link: linkInputValue });
    cardsContainer.prepend(card);
    closePopup(popupAddCard);
    cardAddingForm.reset();
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEsc);
}

function editFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
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

cardAddingForm.addEventListener("submit", addFormHandler);

popupEditOpenButton.addEventListener("click", () => {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    disableButtonOnOpening(profileEditForm, config);
    hideInputError(profileEditForm, nameInput, config);
    hideInputError(profileEditForm, jobInput, config);
});

popupAddCardOpenButton.addEventListener("click", () => {
    openPopup(popupAddCard);
    placeInput.value = "";
    urlInput.value = "";
    disableButtonOnOpening(cardAddingForm, config);
    hideInputError(cardAddingForm, placeInput, config);
    hideInputError(cardAddingForm, urlInput, config);
});

profileEditForm.addEventListener("submit", editFormHandler);

popupEditExitIcon.addEventListener("click", () => closePopup(popupEdit));
popupAddCardExitIcon.addEventListener("click", () => closePopup(popupAddCard));
imagePopupExitIcon.addEventListener("click", () => closePopup(imagePopup));