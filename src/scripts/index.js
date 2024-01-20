import "../pages/index.css";
import { placesList, renderCards, createCard, cardzoom, cardLike, deleteElement } from './cards.js'
import { addOverlayClickListener, openPopup, closePopup} from "./modal.js";

//Кнопки
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
export const popupImageContainer = document.querySelector(".popup_type_image");
const profileAddbtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const buttonClosePopupProfile = document.querySelector(".popup__close");

// Для попапа "Редактировать профиль"
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileContent = editProfilePopup.querySelector(".popup__content");
const editProfileForm = editProfileContent.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDecrtiption = document.querySelector(".profile__description");

// Для попапа "Добавить Место"
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardContent = newCardPopup.querySelector('.popup__content');
const newCardForm = newCardContent.querySelector('.popup__form');
const sityNameInput = newCardContent.querySelector(".popup__input_type_card-name");
const imgUrlInput = newCardContent.querySelector(".popup__input_type_url");

//вызываем фукнцию рендера карточек
renderCards();

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

  // Вставьте новые значения с помощью textContent
  profileDecrtiption.textContent = jobValue;
  profileTitle.textContent = nameValue;
  closePopup(editProfilePopup);
}

editProfileForm.addEventListener("submit", editProfileFormSubmit);

//Функция для ручного добавление карточек
function addCard(event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = sityNameInput.value;
  cardData.link = imgUrlInput.value;
  const card = createCard(cardData, deleteElement, cardLike, function () {
    cardzoom(cardData);
  });
  placesList.prepend(card);
  imgUrlInput.value = "";
  sityNameInput.value = "";
  closePopup(popupAddNewCard);
}

newCardForm.addEventListener("submit", addCard);