import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(name, link) {
        const openedImage = document.querySelector(".image__close-up");
        const openedImageTitle = document.querySelector(".image__title");

        openedImage.src = link;
        openedImageTitle.textContent = name;
        openedImage.alt = name;
        super.open();
    }
}