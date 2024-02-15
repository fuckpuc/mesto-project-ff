//получаем весь контент от темплейт
import { token, cohortId, deletedCard } from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

//создаем функцию для создание карточки с входными данными
function createCard(
  { _id, name, link, owner, likes },
  deleteCard,
  cardLike,
  zoomcard,
  currentUserId
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const delButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likesCounter = card.querySelector(".card__likes-count");
  cardImage.src = link;
  cardImage.alt = `Карточка ${name}`;
  cardTitle.innerText = name;
    likesCounter.textContent = likes.length;
    const userId = "b77843909fb6288163bb8892";
    const isLiked = likes.some((user) => user._id === userId);
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }
    if (owner._id === currentUserId) {
      delButton.style.display = "block";
    } else {
      delButton.style.display = "none";
    }
    delButton.addEventListener("click", function () {
      deleteCard(card, _id);
      deletedCard(_id);
    });

  cardImage.addEventListener("click", zoomcard);

  // likeButton.addEventListener("click", likeCard);
  likeButton.addEventListener("click", function (evt) {
    cardLike(evt, _id, likeButton, likesCounter);
  });
  return card;
}

// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

function cardLike(evt, cardId, likeButton, likesCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedCardData) => {
      // для обновления счётчика лайков
      likesCounter.textContent = updatedCardData.likes.length;
      // чтобы менять цвет кнопки лайка
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.error("Ошибка при постановке лайка", error);
    });
}

export { createCard, deleteElement, cardLike, placesList };
