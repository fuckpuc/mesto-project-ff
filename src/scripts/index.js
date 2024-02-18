import "../pages/index.css";
import { placesList, createCard, deleteElement } from "./card.js";
import { addCloseListeners, openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from './validation.js';
import { updateProfile, addNewCard, updateAvatar, request, cardLike} from "./api.js";
// import { initialCards } from "./cards.js";

//Кнопки
export const newCardSaveButton = document.querySelector(".new-place_button");
export const avatarSaveButton = document.querySelector(".avatar-save_button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImageContainer = document.querySelector(".popup_type_image");
const profileAddbtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");

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
// function renderCards() {
//   initialCards.forEach(function (card) {
//     const cardElement = createCard(card, deleteElement, cardLike, function () {
//       zoomCard(card);
//     });
//     //добавляем карточки в конец списки
//     placesList.append(cardElement);
//   });
// }

//POPUP редактирование профиля
profileEditBtn.addEventListener("click", function () {
  //Установить значение в input текущее значение данных
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDecrtiption.textContent;
  clearValidation(document.querySelector('.popup_type_edit form'));
  openPopup(popupEdit);
});

addCloseListeners(popupEdit, closePopup);

//
//
//POPUP добавление картинки
profileAddbtn.addEventListener("click", function () {
  clearValidation(document.querySelector('.popup_type_new-card form'));
  sityNameInput.value = ""; 
  imgUrlInput.value = "";
  openPopup(popupAddNewCard); 
});

addCloseListeners(popupAddNewCard, closePopup);
//
//
//
//закрытия POPUP зума карточки
addCloseListeners(popupImageContainer, closePopup);

//Фунцкия редактирования "имя" и "работа"
function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const jobValue = jobInput.value;
  const nameValue = nameInput.value;
  evt.submitter.textContent = "Сохранение...";

  updateProfile(nameValue, jobValue).then(() => {
    // Вставьте новые значения с помощью textContent
    profileDecrtiption.textContent = jobValue;
    profileTitle.textContent = nameValue;
    closePopup(popupEdit);
  })
  .catch((error) => {
    console.error("Ошибка при обновление информации о профиле:", error);
  })
  .finally(() => {
    evt.submitter.textContent = "Сохранить";
  });
}

editProfileForm.addEventListener("submit", submitEditProfileForm);

//функция зума карточки
function zoomCard({ name, link }) {
  cardPopupZoomTitle.textContent = name;
  cardPopupZoomImage.src = link;
  cardPopupZoomImage.alt = `Карточка ${name}`;
  openPopup(popupImageContainer);
}

let cardsList;
export let userId;
// Получение информации о пользователе и карточках
Promise.all([
  request(`users/me`, "GET"), // Запрос информации о пользователе
  request(`cards`, "GET"), // Запрос списка карточек
])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDecrtiption.textContent = userData.about;
    cardsList = cardsData;
    userId = userData._id;

    cardsData.forEach((element) => {
      const cards = createCard(
        element,
        deleteElement,
        cardLike,
        function () {
          zoomCard(element);
        },
        userData._id
      );
      placesList.append(cards);
    });
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((error) => {
    console.error("Ошибка при рендеринга карточек:", error);
  });

//Функция для ручного добавление карточек
function addCard(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  addNewCard(sityNameInput.value, imgUrlInput.value)
    .then((data) => {
      const newCard = {
        _id: data._id,
        name: data.name,
        link: data.link,
        likes: data.likes,
        owner: data.owner,
      };
      cardsList.unshift(data);
      const cardElement = createCard(
        newCard,
        deleteElement,
        cardLike,
        function () {
          zoomCard(newCard);
        },
        userId
      );
      placesList.prepend(cardElement);
      event.target.reset();
      closePopup(popupAddNewCard);
      newCardSaveButton.disabled = true;
    })
    .catch((error) => {
      console.error("Ошибка при создания карточки:", error);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
}

newCardForm.addEventListener("submit", addCard);
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
});

profileAvatar.addEventListener("click", () => {
  const avatarLink = profileAvatartForm.elements["avatar-link"];
  avatarLink.value = '';
  clearValidation(document.querySelector('.popup_type_avatar-edit form'));
  openPopup(profileAvatartPopup);
});

addCloseListeners(profileAvatartPopup, closePopup);

function updateProfileAvatar(evt) {
  evt.preventDefault();
  const avatarLink = profileAvatartForm.elements["avatar-link"].value;
  evt.submitter.textContent = "Сохранение...";
  updateAvatar(avatarLink)
  .then(() => {
    profileAvatar.style.backgroundImage = `url(${avatarLink})`;
    closePopup(profileAvatartPopup);
  })
  .catch((error) => {
    console.error("Ошибка при изменения аватарки:", error);
  })
  .finally(() => {
    evt.submitter.textContent = "Сохранить";
  });
}
profileAvatartForm.addEventListener("submit", updateProfileAvatar);
