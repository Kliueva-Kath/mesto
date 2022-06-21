import Popup from "./Popup.js";

// попап подтверждения удаления карточки
export default class PopupWithConfirmation extends Popup {
    setEventListeners() {
        this._form = this._popup.querySelector(".form");
        this._submitButton = this._form.querySelector(".form__save-button");
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this);
        });
        super.setEventListeners();
    }

    handleDeleteCard(deleteFunction) {
        this._handleFormSubmit = deleteFunction;
    }

    // отображение текста "Сохранение..." при сабмите
    renderLoading(text) {
        this._submitButton.textContent = text;
    }
}