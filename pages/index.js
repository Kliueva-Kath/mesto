import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
// import { openPopup, closePopup } from "../utils/utils.js";

import {
    // imagePopupSelector,
    cardsContainer,
    // popupEdit,
    // profileEditForm,
    nameInput,
    jobInput,
    cardAddingForm,
    placeInput,
    urlInput,
    profileName,
    profileJob,
    // popupAddCard,
    // popupEditExitIcon,
    // popupAddCardExitIcon,
    // imagePopupExitIcon,
    // popupAddCardOpenButton,
    // popupEditOpenButton,
    // overlays,
    config,
    initialCards,
    cardListContainer,
} from "../utils/constants.js";

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

// добавление карточек на страницу

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card({
                    data: item,
                    handleCardClick: (item) => {
                        console.log(item.link);
                        item.link.addEventListener("click", (item) => {
                            popupWithImage.open({ name: item.name, link: item.link });
                        });
                    },
                },
                ".cards-template"
            );
            const cardElement = card.generateCard();
            cardList.addItem(cardElement);
        },
    },
    cardListContainer
);

cardList.renderItems();

/* initialCards.forEach((item) => {
    const card = new Card(item, ".cards-template");
    const cardElement = card.generateCard();
    document.querySelector(".elements__container").append(cardElement);
}); */

// создание новых карточек через форму

function addFormHandler(evt) {
    evt.preventDefault();
    // создание новой карточки
    const placeInputValue = placeInput.value;
    const linkInputValue = urlInput.value;
    const cardNew = new Card({ name: placeInputValue, link: linkInputValue },
        ".cards-template"
    );
    const cardGenerated = cardNew.generateCard();
    cardsContainer.prepend(cardGenerated);

    // closePopup(popupAddCard);
    cardAddingForm.reset();
}

function editFormHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    //   closePopup(popupEdit);
}

// СЛУШАТЕЛИ СОБЫТИЙ

/* popupEditOpenButton.addEventListener("click", () => {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // сброс валидации при новом открытии
    profileEditFormValidator.clearErrorsOnOpening(nameInput);
    profileEditFormValidator.clearErrorsOnOpening(jobInput);
}); */

/* popupAddCardOpenButton.addEventListener("click", () => {
    openPopup(popupAddCard);
    cardAddingForm.reset();
    // сброс валидации при новом открытии
    cardAddingFormValidator.disableButtonOnOpening();
    cardAddingFormValidator.clearErrorsOnOpening(placeInput);
    cardAddingFormValidator.clearErrorsOnOpening(urlInput);
}); */

// закрытие кликом по оверлею
/* overlays.forEach((overlay) => {
    overlay.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(document.querySelector(".popup_opened"));
        }
    });
}); */

cardAddingForm.addEventListener("submit", addFormHandler);

profileEditForm.addEventListener("submit", editFormHandler);

// popupEditExitIcon.addEventListener("click", () => PopupWithImage.close());
// popupAddCardExitIcon.addEventListener("click", () => closePopup(popupAddCard));
// imagePopupExitIcon.addEventListener("click", () => closePopup(imagePopup));

const popupWithImage = new PopupWithImage(".popup_type_image");