class UserInfo {
  constructor( { authorNameSelector, authorAboutSelector } ) {
    this._authorNameElement = document.querySelector(authorNameSelector);
    this._authorAboutElement = document.querySelector(authorAboutSelector);
  }

  getUserInfo = () => {
    const dataAuthor = {
      name: this._authorNameElement.textContent,
      about: this._authorAboutElement.textContent
    };
    return dataAuthor;
  };

  setUserInfo(dataUser) {
    this._authorNameElement.textContent = dataUser.name;
    this._authorAboutElement.textContent = dataUser.about;
  };
}

export default UserInfo;