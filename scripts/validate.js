const config = {
    formSelector: ".form",
    inputSelector: ".form__input",
    buttonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_visible",
};

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, config);
    });
}

function setEventListeners(form, config) {
    toggleButtonState(form, config);
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    inputs.forEach((input) => {
        input.addEventListener("input", function() {
            checkInputValidity(form, input, config);
            toggleButtonState(form, config);
        });
    });
}

function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, config);
    } else {
        hideInputError(form, input, config);
    }
}

function showInputError(form, input, errorMessage, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(form, config) {
    const button = form.querySelector(config.buttonSelector);
    if (!form.checkValidity()) {
        button.classList.add(config.inactiveButtonClass);
        button.setAttribute("disabled", true);
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.removeAttribute("disabled", true);
    }
}

enableValidation(config);