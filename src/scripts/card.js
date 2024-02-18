//получаем весь контент от темплейт
import { deletedCard} from "./api.js";
import { userId } from "./index.js";
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

//создаем функцию для создание карточки с входными данными
function createCard(
  { _id, name, link, owner, likes },
  deleteCard,
  cardsLike,
  zoomCard,
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
    deletedCard(_id)
      .then(() => {
        deleteCard(card);
      })
      .catch((error) => {
        console.error("Ошибка при удаление карточки:", error);
      });
  });

  cardImage.addEventListener("click", zoomCard);

  // likeButton.addEventListener("click", likeCard);
  likeButton.addEventListener("click", function () {
    cardsLike(_id, likeButton)
      .then((updatedCardData) => {
        // Обновляем счётчик лайков
        likesCounter.textContent = updatedCardData.likes.length;
        // Меняем цвет кнопки лайка
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Ошибка при поставления лайка:", error);
      });
  });
  return card;
}

// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

export { createCard, deleteElement, placesList };
