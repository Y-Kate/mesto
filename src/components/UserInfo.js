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
    if (dataUser) {
      this._authorNameElement.textContent = dataUser.name;
      this._authorAboutElement.textContent = dataUser.about;
    }
  };

  setUserId(userId) {
    if (userId) {
      this._authorId = userId;
    }
  }

  getUserId() {
    return this._authorId;
  }

  setAvatarUser(avatarLink) {
    if (avatarLink) {
      this._authorAvatarElement.src = avatarLink;
    }
  }
}

export default UserInfo;