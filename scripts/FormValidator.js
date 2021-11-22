class FormValidator {
  constructor(dataForm, formElement) {
    this._inactiveButtonClass = dataForm.inactiveButtonClass;
    this._inputErrorClass = dataForm.inputErrorClass;
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
    this._checkInputError(inputElement);
  }

  _checkInputError = (inputElement) => {
    const spanErrorElement = document.querySelector(`#${inputElement.id}-error`);
    spanErrorElement.textContent = inputElement.validationMessage;
    inputElement.classList.toggle(
      this._inputErrorClass,
      !inputElement.validity.valid,
    )
  }

  checkInputsError = () => {
    this._inputs.forEach(this._checkInputError);
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
    this._buttonSubmit.classList.toggle(this._inactiveButtonClas, isActivate);
  }

  // проверка всех инпутов формы
  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export default FormValidator;
