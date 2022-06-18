import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._form = this._popup.querySelector(".form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this);
    });
    super.setEventListeners();
  }

  handleDeleteCard(deleteFunction) {
    this._handleFormSubmit = deleteFunction;
  }
}
