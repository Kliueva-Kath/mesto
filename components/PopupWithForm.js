import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {}

    setEventListeners(evt) {
        super.setEventListeners();
        this._handleFormSubmit();
    }

    close() {
        super.close();
        const form = this._popup.querySelector(".form");
    }
}