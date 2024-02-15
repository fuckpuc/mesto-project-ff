import {
  nameInput,
  jobInput,
  sityNameInput,
  imgUrlInput,
  newCardSaveButton,
  avatarSaveButton,
  avatarLinkInput,
} from "./index.js";

//Переменные для инпутов профиля
const popupButton = document.querySelector(".popup__button");
const nameErrorMsg = document.querySelector(".name_error-message");
const jobErrorMsg = document.querySelector(".job_erorr-message");

//Переменные для инпута добавление карточек
const sityErrorMessage = document.querySelector(".sity-erorr-message");
const linkErrorMessage = document.querySelector(".image-error_message");

//Переменные для аватара профиля
const avatarErrorMessage = document.querySelector(".avatar-error-message");

const validateName = () => {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
  const currentLength = nameInput.value.length;
  if (!nameInput.value.trim()) {
    nameErrorMsg.textContent = "Вы пропустили это поле";
    return false;
  } else if (currentLength < 2) {
    nameErrorMsg.textContent = `Минимальное количество символов: 2. Длина текста сейчас ${currentLength} символ`;
    return false;
  } else if (currentLength > 40) {
    nameErrorMsg.textContent = `Максимальное количество символов: 40. Длина текста сейчас ${currentLength} символов`;
    return false;
  } else if (!nameRegex.test(nameInput.value)) {
    nameErrorMsg.textContent =
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
    return false;
  } else {
    nameErrorMsg.textContent = "";
    return true;
  }
};

const validateJob = () => {
  const jobRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/;
  const currentLength = jobInput.value.length;

  if (!jobInput.value.trim()) {
    jobErrorMsg.textContent = "Вы пропустили это поле";
    return false;
  } else if (currentLength < 2) {
    jobErrorMsg.textContent = `Минимальное количество символов: 2. Длина текста сейчас ${currentLength} символ`;
    return false;
  } else if (currentLength > 200) {
    jobErrorMsg.textContent = `Максимальное количество символов: 200. Длина текста сейчас ${currentLength} символов`;
    return false;
  } else if (!jobRegex.test(jobInput.value)) {
    jobErrorMsg.textContent =
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
    return false;
  } else {
    jobErrorMsg.textContent = "";
    return true;
  }
};

//валидация профиля
const profileInfoFormValidation = () => {
  const isNameValid = validateName();
  const isDescriptionValid = validateJob();
  popupButton.disabled = !(isNameValid && isDescriptionValid);
};

//валидация название города
const validateSity = () => {
  const sityRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;
  const currentLength = sityNameInput.value.length;
  if (!sityNameInput.value.trim()) {
    sityErrorMessage.textContent = "Вы пропустили это поле";
    return false;
  } else if (currentLength < 2) {
    sityErrorMessage.textContent = `Минимальное количество символов: 2. Длина текста сейчас ${currentLength} символ`;
    return false;
  } else if (currentLength > 30) {
    sityErrorMessage.textContent = `Максимальное количество символов: 30. Длина текста сейчас ${currentLength} символов`;
    return false;
  } else if (!sityRegex.test(sityNameInput.value)) {
    sityErrorMessage.textContent =
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
    return false;
  } else {
    sityErrorMessage.textContent = "";
    return true;
  }
};

//валидация url картинки
const validateImageLink = () => {
  if (!imgUrlInput.value.trim()) {
    linkErrorMessage.textContent = "Вы пропустили это поле";
    return false;
  } else if (!isValidUrl(imgUrlInput.value)) {
    linkErrorMessage.textContent = "Введите адрес сайта.";
    return false;
  } else {
    linkErrorMessage.textContent = "";
    return true;
  }
};

const validateAvatarLink = () => {
  if (!avatarLinkInput.value.trim()) {
    avatarErrorMessage.textContent = "Вы пропустили это поле";
    return false;
  } else if (!isValidUrl(avatarLinkInput.value)) {
    avatarErrorMessage.textContent = "Введите ссылку на картинку.";
    return false;
  } else {
    avatarErrorMessage.textContent = "";
    return true;
  }
};

// Функция для проверки введенного URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const cardInfoFormValidation = () => {
  const isSityValid = validateSity();
  const isImageUrlValid = validateImageLink();
  newCardSaveButton.disabled = !(isSityValid && isImageUrlValid);
};

const avatarInfoFormValidation = () => {
  const isAvatarUrlValid = validateAvatarLink();
  avatarSaveButton.disabled = !isAvatarUrlValid;
};

export {
  profileInfoFormValidation,
  cardInfoFormValidation,
  sityErrorMessage,
  linkErrorMessage,
  avatarInfoFormValidation,
};
