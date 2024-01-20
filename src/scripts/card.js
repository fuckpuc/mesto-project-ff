//получаем весь контент от темплейт
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

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
  cardImage.addEventListener("click", zoomcard);
  likeButton.addEventListener("click", likeCard);
  delButton.addEventListener("click", function () {
    deleteCard(card);
  });
  return card;
}

// @todo: Функция удаления карточки
function deleteElement(element) {
  element.remove();
}

//функция лайка
function cardLike(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

export {createCard, deleteElement, cardLike, placesList};