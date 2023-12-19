// @todo: Функция удаления карточки
function deleteElement() {
  const card = document.querySelector(".card");
  card.remove();
}

//получаем весь контент от темплейт
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

//создаем функцию для создание карточки с входными данными
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

//функция для отображения карточки на странице
function renderCards() {
  initialCards.forEach(function (card) {
    const cardElement = addElement(card, deleteElement);
    //добавляем карточки в конец списки
    placesList.append(cardElement);
  });
}
//вызываем фукнцию
renderCards();
