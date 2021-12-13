class FormValidator {
  constructor(dataForm, formElement) {
    this._inactiveButtonClass = dataForm.inactiveButtonClass;
    this._inputErrorClass = dataForm.inputErrorClass;
    this._formElement = formElement;
    this._inputs = Array.from(formElement.querySelectorAll(dataForm.inputSelector));
    this._buttonSubmit = formElement.querySelector(dataForm.submitButtonSelector);
  }

  // запуск валидации
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
    const spanErrorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
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
      this._inactivateButtonSubmit();
    } else {
      this._activateButtonSubmit();
    }
  }

  _activateButtonSubmit = () => {
    this._buttonSubmit.disabled = false;
    this._buttonSubmit.classList.remove(this._inactiveButtonClass)
  }

  _inactivateButtonSubmit = () => {
    this._buttonSubmit.disabled = true;
    this._buttonSubmit.classList.add(this._inactiveButtonClass)
  }

  // проверка всех инпутов формы
  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  clearErrors = () => {
    this._inactivateButtonSubmit();
    this._inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
      const spanErrorElement = this._formElement.querySelector(`#${input.id}-error`);
      spanErrorElement.textContent = '';
    })
  }
}

export default FormValidator;
