import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function  EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function changeUserName(event) {
        setName(event.target.value);
    }

    function changeUserDescription(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return(
    <PopupWithForm
        name="edit"
        title='Редактировать профиль'
        textBtn='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <label className="form__field">
            <input className="form__input form__input_name_username" type="text" placeholder="Имя" name="username"
                   id="username-input" required minLength={2} maxLength={40} value={name || ''} onChange={changeUserName} />
            <span className="form__input-error username-input-error" id="username-input-error" />
        </label>
        <label className="form__field">
            <input className="form__input form__input_name_profession" type="text" placeholder="О себе"
                   name="profession" id="profession-input" required minLength={2} maxLength={200} value={description || ''} onChange={changeUserDescription} />
            <span className="form__input-error profession-input-error" id="profession-input-error" />
        </label>
    </PopupWithForm>
    )
}

export default EditProfilePopup;