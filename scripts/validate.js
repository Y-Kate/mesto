// функции 6 спринт 
// обработчики значений input 

const dataClasses = {
  formSelector: '.form-popup',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-save',
  inactiveButtonClass: 'form-popup__button-invalid',
  inputErrorClass: 'form-popup__input_state_invalid',
}

enableValidation(dataClasses);

function enableValidation(dataClasses) {
  const forms = Array.from(document.querySelectorAll(dataClasses.formSelector));
  forms.forEach((form) => addListenersToForm(form, dataClasses));
}

function addListenersToForm(form, dataClasses) {
  const inputs = Array.from(form.querySelectorAll(dataClasses.inputSelector));
  inputs.forEach((input) => addlistenersToInput(input, dataClasses));
  form.addEventListener('submit', (evt) => handlerSubmit(evt, dataClasses));
  form.addEventListener('input', (evt) => handlerFormInput(evt, dataClasses));
  setSubmitButtonState(form, dataClasses);
}

// обработчик активности кнопки popup

function handlerFormInput(evt, dataClasses) {
  const form = evt.currentTarget;
  setSubmitButtonState(form, dataClasses);
}

function setSubmitButtonState(form, dataClasses) {
  const button = form.querySelector(dataClasses.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(dataClasses.inactiveButtonClass, !form.checkValidity());
}

function handlerSubmit(evt, dataClasses) {
  evt.preventDefault();
  const form = evt.target;
  const data = Array.from(form.querySelectorAll(dataClasses.inputSelector)).reduce(
    (sum, input) => ({
      ...sum,
      [input.name]: input.value,
  }),
  {},
);

  console.log(data);
}

function addlistenersToInput(input, dataClasses) {
  input.addEventListener('input', (evt) => handleFieldValidation(evt, dataClasses));
}

function handleFieldValidation(evt, dataClasses) {
  const element = evt.target;
  element.setCustomValidity(''); // сброс описание текса ошибки
  const ErrorContainer = document.querySelector(`#${element.id}-error`);
  ErrorContainer.textContent = element.validationMessage;
  element.classList.toggle(
    dataClasses.inputErrorClass, 
    !element.validity.valid,
  );
}