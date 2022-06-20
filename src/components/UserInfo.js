export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const data = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.style.backgroundImage,
    };
    return data;
  }
  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
  changeAvatar(avatar) {
    this._avatar.style.backgroundImage = `url("${avatar}")`;
  }
}
