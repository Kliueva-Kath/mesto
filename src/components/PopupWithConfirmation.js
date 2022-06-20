import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
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
