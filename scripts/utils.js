function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEsc);
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

// попап просмотра картинки
const imagePopup = document.querySelector(".popup_type_image");

export { openPopup, closePopup, imagePopup };