class FormValidator {
  constructor(dataClasses, formElement) {
    this.dataClasses = dataClasses;
    this.formElement = formElement;
    this.inputs = Array.from(this.formElement.querySelectorAll(this.dataClasses.inputSelector));
    this.buttonSubmit = this.formElement.querySelector(this.dataClasses.submitButtonSelector);

  }

  // const dataClasses = {
  //   formSelector: '.form-popup',
  //   inputSelector: '.form-popup__input',
  //   submitButtonSelector: '.form-popup__button-save',
  //   inactiveButtonClass: 'form-popup__button-invalid',
  //   inputErrorClass: 'form-popup__input_state_invalid',
  // }


  // обработчики значений input

  setEventListeners() {
    this.inputs.forEach((input) => addListenersToInput(input));
    this.formElement.addEventListener('input', () => setSubmitButtonState());
    setSubmitButtonState();
  }

  // проверка всех инпутов формы
  hasInvalidInput() {
    return this.inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  setSubmitButtonState() {
    if (hasInvalidInput()) {
      toggleActivateButtonSubmit(true);
    } else {
      toggleActivateButtonSubmit(false);
    }
  }

  toggleActivateButtonSubmit(isActivate) {
    this.buttonSubmit.disabled = isActivate;
    this.buttonSubmit.classList.toggle(this.dataClasses.inactiveButtonClass, isActivate);
  }

  addListenersToInput(input) {
    input.addEventListener('input', handleFieldValidation);
  }

  handleFieldValidation(evt) {
    this.inputElement = evt.target;
    this.spanErrorElement = document.querySelector(`#${this.inputElement.id}-error`);
    this.spanErrorElement.textContent = this.inputElement.validationMessage;
    this.inputElement.classList.toggle(
      this.dataClasses.inputErrorClass,
      !inputElement.validity.valid,
    )
  }
}
