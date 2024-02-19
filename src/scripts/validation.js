const showInputError = (formElement, inputElement, errorMessage, validData) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}_error-message`
  );
  inputElement.classList.add(validData.inputErrorClass);
  errorElement.textContent = errorMessage || inputElement.validationMessage;
  errorElement.classList.add(validData.errorClass);
};

const hideInputError = (formElement, inputElement, validData) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}_error-message`
  );
  inputElement.classList.remove(validData.inputErrorClass);
  errorElement.classList.remove(validData.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validData) => {
  const errorMessage = inputElement.dataset.errorMessage;
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validData);
  } else {
    hideInputError(formElement, inputElement, validData);
  }
};

const setEventListeners = (formElement, validData) => {
  const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
  const buttonElement = formElement.querySelector(validData.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validData);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validData);
      toggleButtonState(inputList, buttonElement, validData);
    });
  });
};

const enableValidation = (validData) => {
  const formList = Array.from(document.querySelectorAll(validData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
    const buttonElement = formElement.querySelector(validData.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validData);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, validData);
        toggleButtonState(inputList, buttonElement, validData);
      });
    });
    setEventListeners(formElement, validData);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validData) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validData.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validData.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const clearValidation = (formElement, validData) => {
  const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
  const buttonElement = formElement.querySelector(validData.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validData);
  });
  toggleButtonState(inputList, buttonElement, validData);
};

export { enableValidation, clearValidation };
