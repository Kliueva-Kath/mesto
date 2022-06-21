import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(name, link) {
        this._openedImage = this._popup.querySelector(".image__close-up");
        this._openedImageTitle = this._popup.querySelector(".image__title");

        this._openedImage.src = link;
        this._openedImageTitle.textContent = name;
        this._openedImage.alt = name;
        super.open();
    }
}