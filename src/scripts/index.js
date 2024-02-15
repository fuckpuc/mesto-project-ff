import "../pages/index.css";
import { initialCards } from "./cards.js";
import { placesList, createCard, cardLike, deleteElement } from "./card.js";
import { addOverlayClickListener, openPopup, closePopup } from "./modal.js";
import {
  profileInfoFormValidation,
  cardInfoFormValidation,
  linkErrorMessage,
  sityErrorMessage,
  avatarInfoFormValidation,
} from "./validation.js";
import {
  updateProfile,
  addNewCard,
  updateAvatar,
  fetchData,
  cohortId,
} from "./api.js";

//Кнопки
export const newCardSaveButton = document.querySelector(".new-place_button");
export const avatarSaveButton = document.querySelector(".avatar-save_button");
const profileEditSaveButton = document.querySelector(".profile-save_button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImageContainer = document.querySelector(".popup_type_image");
const profileAddbtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile = popupEdit.querySelector(".popup__close");

//для аватарки
const profileAvatartPopup = document.querySelector(".popup_type_avatar-edit");
const profileAvatarContent =
  profileAvatartPopup.querySelector(".popup__content");
const profileAvatartForm = profileAvatarContent.querySelector(".popup__form");
const profileAvatar = document.querySelector(".profile__image");
export const avatarLinkInput = profileAvatartForm.querySelector(
  ".popup__input_type_avatarka"
);

// Для попапа "Редактировать профиль"
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileContent = editProfilePopup.querySelector(".popup__content");
const editProfileForm = editProfileContent.querySelector(".popup__form");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDecrtiption = document.querySelector(".profile__description");

// Для попапа "Добавить Место"
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardContent = newCardPopup.querySelector(".popup__content");
const newCardForm = newCardContent.querySelector(".popup__form");
export const sityNameInput = newCardContent.querySelector(
  ".popup__input_type_card-name"
);
export const imgUrlInput = newCardContent.querySelector(
  ".popup__input_type_url"
);

//Для попипа "Зума картинки"
const cardPopupZoomImage = document.querySelector(".popup__image");
const cardPopupZoomTitle = document.querySelector(".popup__caption");

//функция для отображения карточки на странице
function renderCards() {
  initialCards.forEach(function (card) {
    const cardElement = createCard(card, deleteElement, cardLike, function () {
      cardzoom(card);
    });
    //добавляем карточки в конец списки
    placesList.append(cardElement);
  });
}

//POPUP редактирование профиля
profileEditBtn.addEventListener("click", function () {
  //Установить значение в input текущее значение данных
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDecrtiption.textContent;
  openPopup(popupEdit);
});

addOverlayClickListener(popupEdit, closePopup);

buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(popupEdit);
});
//
//
//
//POPUP добавление картинки
profileAddbtn.addEventListener("click", function () {
  openPopup(popupAddNewCard);
  linkErrorMessage.textContent = "";
  sityErrorMessage.textContent = "";
  imgUrlInput.value = "";
  sityNameInput.value = "";
  newCardSaveButton.disabled = true;
});

addOverlayClickListener(popupAddNewCard, closePopup);
//
//
//
//закрытия POPUP зума карточки
addOverlayClickListener(popupImageContainer, closePopup);

//Фунцкия редактирования "имя" и "работа"
function editProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;
  profileEditSaveButton.textContent = "Сохранение...";

  updateProfile(nameValue, jobValue);

  // Вставьте новые значения с помощью textContent
  profileDecrtiption.textContent = jobValue;
  profileTitle.textContent = nameValue;
  closePopup(popupEdit);
}

editProfileForm.addEventListener("submit", editProfileFormSubmit);

//функция зума карточки
function cardzoom({ name, link }) {
  cardPopupZoomTitle.textContent = name;
  cardPopupZoomImage.src = link;
  cardPopupZoomImage.alt = `Карточка ${name}`;
  openPopup(popupImageContainer);
}

let usersData;
let cardsList;
// Получение информации о пользователе и карточках
Promise.all([
  fetchData(`https://nomoreparties.co/v1/${cohortId}/users/me`),
  fetchData(`https://nomoreparties.co/v1/${cohortId}/cards`),
])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDecrtiption.textContent = userData.about;
    usersData = userData._id;
    cardsList = cardsData;

    cardsData.forEach((element) => {
      const cards = createCard(
        element,
        deleteElement,
        cardLike,
        function () {
          cardzoom(element);
        },
        userData._id
      );
      placesList.append(cards);
    });
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch(() => {
    renderCards(); // Вызываем функцию для отрисовки карточек из локального массива, если к сереру доступа нет
  });

//Функция для ручного добавление карточек
function addCard(event) {
  event.preventDefault();
  newCardSaveButton.textContent = "Сохранение...";
  addNewCard(sityNameInput.value, imgUrlInput.value).then((data) => {
    const newCard = {
      _id: data._id,
      name: data.name,
      link: data.link,
      likes: data.likes,
      owner: data.owner,
    };
    cardsList.unshift(newCard);
    const cardElement = createCard(
      newCard,
      deleteElement,
      cardLike,
      function () {
        cardzoom(newCard);
      },
      usersData
    );
    placesList.prepend(cardElement);
    imgUrlInput.value = "";
    sityNameInput.value = "";
    closePopup(popupAddNewCard);
    newCardSaveButton.disabled = true;
  });
}

newCardForm.addEventListener("submit", addCard);

//Валидация инпутов профиля
nameInput.addEventListener("input", profileInfoFormValidation);
jobInput.addEventListener("input", profileInfoFormValidation);

//валидация инпутов новой карточки
sityNameInput.addEventListener("input", cardInfoFormValidation);
imgUrlInput.addEventListener("input", cardInfoFormValidation);

//валидация для инпута проверки ссылки аватарки
avatarLinkInput.addEventListener("input", avatarInfoFormValidation);

profileAvatar.addEventListener("click", () => {
  openPopup(profileAvatartPopup);
  avatarSaveButton.disabled = true;
});

buttonClosePopupProfile.addEventListener("click", function () {
  closePopup(profileAvatartPopup);
});

addOverlayClickListener(profileAvatartPopup, closePopup);

function updateProfileAvatar(evt) {
  evt.preventDefault();
  const avatarLink = profileAvatartForm.elements["avatar-link"].value;
  avatarSaveButton.textContent = "Сохранение...";
  updateAvatar(avatarLink);
  profileAvatar.style.backgroundImage = `url(${avatarLink})`;
  closePopup(profileAvatartPopup);
}
profileAvatartForm.addEventListener("submit", updateProfileAvatar);
