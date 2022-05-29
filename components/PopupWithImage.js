export default class PopupWithImage extends Popup {
    open({ data }) {
        const openedImage = document.querySelector(".image__close-up");
        const openedImageTitle = document.querySelector(".image__title");

        openedImage.src = data.link;
        openedImageTitle.textContent = data.name;
        openedImage.alt = data.name;
        super.open();
    }
}