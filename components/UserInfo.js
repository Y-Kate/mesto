class UserInfo {
  constructor ( { authorNameSelector, authorAboutSelector,} ) {
    this._authorNameSelector = authorNameSelector;
    this._authorAboutSelector = authorAboutSelector;
    this._inputName = this._authorNameSelector.querySelector('.form-popup__input_type_name');
    this._inputAbouth = this._authorAboutSelector.querySelector('.form-popup__input_type_profession');
  }

  getUserInfo = () => {
    let values = {};
    // this._inputName = () => {
    //   values[input.name] = input.value;
    // };
    // console.log(values);
    
    return values;
  };

  setUserInfo = () => {
    const values = this.getUserInfo;

  };

}


// function handleClickButtonEdit() {
//   inputName.value = profileNameElement.textContent;
//   inputAbout.value = profileDescriptionElement.textContent;
//   formEditProfileValidator.checkInputsError();
//   popupFormAuthor.open();
// }