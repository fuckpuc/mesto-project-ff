//Закрытия Popup по клику на BackGround
function addOverlayClickListener(popupElement, closePopFunction) {
  popupElement.addEventListener("click", function (elem) {
    if (
      elem.target.classList.contains("popup") ||
      elem.target.classList.contains("popup__close")
    ) {
      closePopFunction(popupElement);
    }
  });
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

// Функция обработки события клавиши Esc
function closeEscPopup(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // Ищем открытый попап по классу 'popup_is-opened'
    if (popup) {
      closePopup(popup);
    }
  }
}

export { addOverlayClickListener, openPopup, closePopup};
