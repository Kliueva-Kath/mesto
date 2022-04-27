function enableValidation(allFormSelectors) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formSelector) => {
        formSelector.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formSelector);
    });
}

function enableValidation(config) {
    const form = document.querySelector(config.formSelector);
    const inputs = document.querySelectorAll(config.inputSelector);

    // отмена отправки формы
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
}

function showInputError(formSelector, inputSelector, errorMessage) {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_visible");
}

const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_visible");
    errorElement.textContent = "";
};

function checkInputValidity(formSelector, inputSelector) {
    if (!inputSelector.validity.valid) {
        showInputError(
            formSelector,
            inputSelector,
            inputSelector.validationMessage
        );
    } else {
        hideInputError(formSelector, inputSelector);
    }
}

function setEventListeners(formSelector) {
    const inputList = Array.from(config.inputSelector);
    inputList.forEach((inputSelector) => {
        inputSelector.addEventListener("input", function() {
            checkInputValidity(formSelector, inputSelector);
        });
    });
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
        submitButtonSelector.classList.add(config.inactiveButtonClass);
    } else {
        submitButtonSelector.classList.remove(config.inactiveButtonClass);
    }
}

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: ".form__save-button_inactive",
    inputErrorClass: ".form__input_type_error",
    errorClass: ".form__input-error_visible",
});