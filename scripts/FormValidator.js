class FormValidator {
  constructor(dataForm, formElement) {
    this.dataClasses = dataForm;
    this.formElement = formElement;
    this.inputs = Array.from(formElement.querySelectorAll(dataForm.inputSelector));
    this.buttonSubmit = formElement.querySelector(dataForm.submitButtonSelector);

  }

  // обработчики значений input
  setEventListeners = () => {
    this.inputs.forEach((input) => this._addListenersToInput(input));
    this.formElement.addEventListener('input', () => this._setSubmitButtonState());
    this._setSubmitButtonState();
  }

  _addListenersToInput = (input) => {
    input.addEventListener('input', this._handleFieldValidation);
  }
  
  _handleFieldValidation = (evt) => {
    const inputElement = evt.target;
    const spanErrorElement = document.querySelector(`#${inputElement.id}-error`);
    spanErrorElement.textContent = inputElement.validationMessage;
    inputElement.classList.toggle(
      this.dataClasses.inputErrorClass,
      !inputElement.validity.valid,
    )
  }

  _setSubmitButtonState = () => {
    if (this._hasInvalidInput()) {
      this._toggleActivateButtonSubmit(true);
    } else {
      this._toggleActivateButtonSubmit(false);
    }
  }

  _toggleActivateButtonSubmit = (isActivate) => {
    this.buttonSubmit.disabled = isActivate;
    this.buttonSubmit.classList.toggle(this.dataClasses.inactiveButtonClass, isActivate);
  }

  // проверка всех инпутов формы
  _hasInvalidInput = () => {
    return this.inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export default FormValidator;