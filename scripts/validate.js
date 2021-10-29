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
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault() // зачем нужна повторная отмена стандартной отправки формы? Мы ведь в обработчиках submit на 102 и 109 строчках в index.js их уже отменяем
    });
    setEventListeners(form, dataClasses);
  });
}

function setEventListeners(form, dataClasses) {
  const inputs = Array.from(form.querySelectorAll(dataClasses.inputSelector));
  const buttonSubmit = form.querySelector(dataClasses.submitButtonSelector);

  inputs.forEach((input) => addlistenersToInput(input, dataClasses));
  form.addEventListener('input', (evt) => setSubmitButtonState(evt.currentTarget, dataClasses, inputs, buttonSubmit));
  setSubmitButtonState(form, dataClasses, inputs, buttonSubmit);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function setSubmitButtonState(form, dataClasses, inputs, buttonSubmit) {

  if (hasInvalidInput(inputs)) {
    toggleActivateButtonSubmit(buttonSubmit, dataClasses, true);
  } else {
    toggleActivateButtonSubmit(buttonSubmit, dataClasses, false);
  }
}

function toggleActivateButtonSubmit(buttonSubmit, dataClasses, isActivate) {
  buttonSubmit.disabled = isActivate;
  buttonSubmit.classList.toggle(dataClasses.inactiveButtonClass, isActivate);
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