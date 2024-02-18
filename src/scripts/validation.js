const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}_error-message`
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage || inputElement.validationMessage;
  errorElement.classList.add("error_msg_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}_error-message`
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("error_msg_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  const errorMessage = inputElement.dataset.errorMessage;
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
}

const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

export { enableValidation, clearValidation };
