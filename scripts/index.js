// сам попап
let popup = document.querySelector(".popup");

// Форма и поля ввода
let profileEditForm = document.forms.profileEditForm;
let nameInput = profileEditForm.querySelector(".input__text_type_name");
let jobInput = profileEditForm.querySelector(".input__text_type_job");

// элемены имени и информации о себе в профиле
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

// кнопка открытия попапа (кнопка редактирования)
let openPopupButton = document.querySelector(".profile__edit-button");

// кнопка закрытия попапа
let closePopupButton = document.querySelector(".popup__close-icon");

// открытие попапа

function openPopup() {
  popup.classList.add("popup_opened");
  // значения в полях ввода по умолчанию - текущие данные профиля
  nameInput.defaultValue = profileName.textContent;
  jobInput.defaultValue = profileJob.textContent;
}
openPopupButton.addEventListener("click", openPopup);

// закрытие попапа

function closePopup() {
  popup.classList.remove("popup_opened");
}
closePopupButton.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileEditForm.addEventListener("submit", formSubmitHandler);
