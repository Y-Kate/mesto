class FormValidator {
  constructor(dataForm, formElement) {
    this._dataClasses = dataForm;
    this._formElement = formElement;
    this._inputs = Array.from(formElement.querySelectorAll(dataForm.inputSelector));
    this._buttonSubmit = formElement.querySelector(dataForm.submitButtonSelector);
  }

  // обработчики значений input
  enableValidation = () => {
    this._inputs.forEach((input) => this._addListenersToInput(input));
    this._formElement.addEventListener('input', this._setSubmitButtonState);
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
      this._dataClasses.inputErrorClass,
      !inputElement.validity.valid,
    )
  }

  _setSubmitButtonState = () => {
    if (this._hasInvalidInput()) {
      this.toggleActivateButtonSubmit(true);
    } else {
      this.toggleActivateButtonSubmit(false);
    }
  }

  toggleActivateButtonSubmit = (isActivate) => {
    this._buttonSubmit.disabled = isActivate;
    this._buttonSubmit.classList.toggle(this._dataClasses.inactiveButtonClass, isActivate);
  }

  // проверка всех инпутов формы
  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export default FormValidator;