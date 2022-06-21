export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close-icon");
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
            this._popup.classList.remove("popup_opened");
            document.removeEventListener("keydown", this._handleEscClose);
        }
        // закрытие по esc
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        // закрытие по клику на кнопку закрытия
        this._closeButton.addEventListener("click", () => {
            this.close();
        });

        // закрытие кликом по оверлею
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}