class UserInfo {
  constructor( { authorNameSelector, authorAboutSelector, authorAvatarSelector } ) {
    this._authorNameElement = document.querySelector(authorNameSelector);
    this._authorAboutElement = document.querySelector(authorAboutSelector);
    this._authorAvatarElement = document.querySelector(authorAvatarSelector);
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

  setAvatarUser(avatarLink) {
    this._authorAvatarElement.src = avatarLink;
  }
}

export default UserInfo;