import "../pages/index.css";
import { initialCards } from "./cards.js";


// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

//функция лайка
function Cardlike(evt) {
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

//функция зума карточки
function cardzoom({name, link}) {
  const PopImage = document.querySelector(".popup__image");
  const PopTitle = document.querySelector(".popup__caption");
  PopTitle.textContent = name;
  PopImage.src = link;
  OpenPop(popupImage);
}

//получаем весь контент от темплейт
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

//создаем функцию для создание карточки с входными данными
function addElement({ name, link }, deleteCard, likeCard, zoomcard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const delButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  cardImage.src = link;
  cardImage.alt = `Карточка ${name}`;
  cardTitle.innerText = name;
  cardImage.addEventListener('click', zoomcard);
  likeButton.addEventListener('click', likeCard);
  delButton.addEventListener("click", function () {
    deleteCard(card);
  });
  return card;
}

//функция для отображения карточки на странице
function renderCards() {
  initialCards.forEach(function (card) {
    const cardElement = addElement(card, deleteElement, Cardlike, function() {
      cardzoom(card);
    });
    //добавляем карточки в конец списки
    placesList.append(cardElement);
  });
}
//вызываем фукнцию
renderCards();

const ProfileAddbtn = document.querySelector(".profile__add-button");
const ProfileEditBtn = document.querySelector(".profile__edit-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const Popupclose = document.querySelector(".popup__close");

//POPUP редактирование профиля
ProfileEditBtn.addEventListener("click", function () {
  OpenPop(popupEdit);
});

popupEdit.addEventListener('click', function(elem) {
    if(elem.target.classList.contains('popup') || elem.target.classList.contains('popup__close')) {
      closePop(popupEdit);
    }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePop(popupEdit)
  }
});

Popupclose.addEventListener('click', function() {
  closePop(popupEdit);
});
//
//
//
//POPUP добавление картинки
ProfileAddbtn.addEventListener('click', function() {
  OpenPop(popupAdd);
});

popupAdd.addEventListener('click', function(elem) {
  if(elem.target.classList.contains('popup') || elem.target.classList.contains('popup__close')) {
    closePop(popupAdd);
  }
});


document.addEventListener('keydown', function(event) {
  if(event.key === 'Escape') {
    closePop(popupAdd);
  }
});
//
//
//
//POPUP зума карточки
popupImage.addEventListener('click', function(elem) {
  if(elem.target.classList.contains('popup') || elem.target.classList.contains('popup__close')) {
    closePop(popupImage);
  }
});
document.addEventListener('keydown', function(event) {
  if(event.key === 'Escape') {
    closePop(popupImage);
  }
});


//Функции POPUP-ов
function OpenPop(element) {
  element.classList.add('popup_is-opened');
  element.classList.remove('popup_is-animated');
}

//закрытие попапа
function closePop(element) {
  element.classList.remove('popup_is-opened');
  element.classList.add('popup_is-animated');
}

const formElement = document.querySelector('.popup__form');
const popup = document.querySelector('.popup');
const nameInput =  document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
let profileTitle = document.querySelector(".profile__title");
let profileDecrtiption = document.querySelector(".profile__description");

//Установить значение в input текущее значение данных
nameInput.value = profileTitle.textContent;
jobInput.value = profileDecrtiption.textContent;

//Функция, где инпуты по дефолту принимают значения "имя" и "работа"
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const jobValue = jobInput.value;
    const nameValue = nameInput.value;

    // Вставьте новые значения с помощью textContent
    profileDecrtiption.textContent = jobValue;
    profileTitle.textContent = nameValue;
    closePop(popup);
}

formElement.addEventListener('submit', handleFormSubmit);

const newPlaceForm = document.querySelector('.popup_type_new-card');
const SityNameInput = document.querySelector('.popup__input_type_card-name');
const UrlInput = document.querySelector('.popup__input_type_url');

//Функция для ручного добавление карточек
function addCard(event) {
  event.preventDefault();
  const cardData = {};
  cardData.name = SityNameInput.value;
  cardData.link = UrlInput.value;
  const card = addElement(cardData, deleteElement, Cardlike, function() {
    cardzoom(cardData);
  } );
  placesList.prepend(card);
  UrlInput.value = '';
  SityNameInput.value = '';
  closePop(popupAdd)
}

newPlaceForm.addEventListener("submit", addCard);