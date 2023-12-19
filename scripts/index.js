// @todo: Функция удаления карточки
function deleteElement() {
  const card = document.querySelector(".card");
  card.remove();
}

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function addElement({ name, link }) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const delButton = card.querySelector(".card__delete-button");
  cardImage.src = link;
  cardTitle.innerText = name;
  delButton.addEventListener("click", deleteElement);
  return card;
}

function renderCards() {
  initialCards.forEach(function (card) {
    const cardElement = addElement(card, deleteElement);
    placesList.append(cardElement);
  });
}
renderCards();
