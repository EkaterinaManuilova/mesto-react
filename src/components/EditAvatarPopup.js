import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar:avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title='Обновить аватар'
            textBtn='Да'
            textLoadBtn='Сохранение'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input ref={avatarRef}  className="form__input form__input_name_avatar"
                       type="url" placeholder="Ссылка на новый аватар" name="avatar"
                       id="avatar-input" required  />
                <span className="form__input-error avatar-input-error" id="avatar-input-error" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;