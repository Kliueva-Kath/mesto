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
            id: this._id,
        };
        return data;
    }
    setUserInfo({ name, about, avatar, _id }) {
        this._name.textContent = name;
        this._job.textContent = about;
        this.changeAvatar(avatar);
        this._id = _id;
    }
    changeAvatar(avatar) {
        this._avatar.style.backgroundImage = `url("${avatar}")`;
    }
}