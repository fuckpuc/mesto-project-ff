import { openPopup } from "./modal.js";
import { popupImageContainer } from "./index.js";
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const popupImage = document.querySelector(".popup__image");
const popupTitle = document.querySelector(".popup__caption");
//получаем весь контент от темплейт
const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

//создаем функцию для создание карточки с входными данными
function createCard({ name, link }, deleteCard, likeCard, zoomcard) {
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
    const cardElement = createCard(card, deleteElement, cardLike, function() {
      cardzoom(card);
    });
    //добавляем карточки в конец списки
    placesList.append(cardElement);
  });
}


// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

//функция лайка
function cardLike(evt) {
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

//функция зума карточки
function cardzoom({ name, link }) {
  popupTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = `Карточка ${name}`;
  openPopup(popupImageContainer);
}


export { renderCards, createCard, cardzoom, cardLike, deleteElement };