import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._inputList = this._popup.querySelectorAll(".form__input");
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }

    setEventListeners() {
        this._form = this._popup.querySelector(".form");
        this._submitButton = this._form.querySelector(".form__save-button");
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._form.reset();
    }

    // отображение текста "Сохранение..." при сабмите
    renderLoading(text) {
        this._submitButton.textContent = text;
    }
}