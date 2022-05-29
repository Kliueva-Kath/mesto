export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add("popup_opened");
    }

    close() {
        this._popup.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this._popup.close();
        }
    }

    setEventListeners() {
        // закрытие по клику на кнопку закрытия
        const popupCloseButton = this._popup.querySelector(".popup__close-icon");
        popupCloseButton.addEventListener("click", () => {
            this._popup.close();
        });

        // закрытие кликом по оверлею
        const overlays = Array.from(document.querySelectorAll(".popup"));
        overlays.forEach((overlay) => {
            overlay.addEventListener("mousedown", (evt) => {
                if (evt.target === evt.currentTarget) {
                    this._popup.close();
                }
            });
        });
    }
}