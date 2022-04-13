import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const [avatar, setAvatar] = React.useState('');

  const avatarRef = React.useRef();



    React.useEffect(() => {
        setAvatar('');
    }, []);

    function handleAvatarChange() {
        setAvatar(avatarRef.current.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title='Обновить аватар'
            textBtn='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input ref={avatarRef} value={avatar} className="form__input form__input_name_avatar" type="url" placeholder="Ссылка на новый аватар" name="avatar" id="avatar-input" required onChange={handleAvatarChange} />
                <span className="form__input-error avatar-input-error" id="avatar-input-error" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;