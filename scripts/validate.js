const dataClasses = {
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-save',
  inactiveButtonClass: 'form-popup__button-invalid',
  inputErrorClass: 'form-popup__input_state_invalid',
}

enableValidation(dataClasses);

// обработчики значений input 

function enableValidation(dataClasses) {
  const forms = Array.from(document.querySelectorAll(dataClasses.formSelector));
  forms.forEach((form) => setEventListeners(form, dataClasses));
}

function setEventListeners(form, dataClasses) {
  const inputs = Array.from(form.querySelectorAll(dataClasses.inputSelector));
  inputs.forEach((input) => addlistenersToInput(input, dataClasses));
  form.addEventListener('input', (evt) => setSubmitButtonState(evt.currentTarget, dataClasses, inputs));
  setSubmitButtonState(form, dataClasses, inputs);
}

function setSubmitButtonState(form, dataClasses, inputs) {
  const button = form.querySelector(dataClasses.submitButtonSelector);

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(dataClasses.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(dataClasses.inactiveButtonClass);
  }
}

function addlistenersToInput(input, dataClasses) {
  input.addEventListener('input', (evt) => handleFieldValidation(evt, dataClasses));
}

function handleFieldValidation(evt, dataClasses) {
  const element = evt.target;
  const errorContainer = document.querySelector(`#${element.id}-error`);
  errorContainer.textContent = element.validationMessage;
  element.classList.toggle(
    dataClasses.inputErrorClass, 
    !element.validity.valid,
  );
}