export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items, userId) {
            this._renderedItems = items;
            this._userId = userId;
            this._renderedItems.forEach((item) => {
                this._renderer(item, userId);
            });
        }
        // вставка всех элементов в контейнер
    addItem(element) {
            this._container.append(element);
        }
        // добавление новой карточки
    addNewCard(element) {
        this._container.prepend(element);
    }
}