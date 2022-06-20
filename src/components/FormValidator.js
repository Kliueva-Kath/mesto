export default class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(config.inputSelector)
    );
    this._button = this._form.querySelector(config.buttonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (!this._form.checkValidity()) {
      this.disableButton();
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute("disabled", true);
    }
  }
  // вызывается в index.js при открытии попапов для очистки ошибок
  clearErrorsOnOpening() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
  // вызывается в index.js при открытии попапов для сброса состояния кнопки
  disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute("disabled", true);
  }
}
