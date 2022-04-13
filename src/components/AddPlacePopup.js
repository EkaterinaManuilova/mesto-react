import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, []);

    function changeCardName(event) {
        setName(event.target.value);
    }

    function changeCardLink(event) {
        setLink(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

return (
    <PopupWithForm
        name="add"
        title='Новое место'
        textBtn='Создать'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <label className="form__field">
            <input className="form__input form__input_name_title" type="text" placeholder="Название" name="name" id="title-input" required minLength={2} maxLength={30} value={name || ''} onChange={changeCardName} />
            <span className="form__input-error title-input-error" id="title-input-error" />
        </label>
        <label className="form__field">
            <input className="form__input form__input_name_url" type="url" placeholder="Ссылка на картинку" name="link" id="url-input" required value={link || ''} onChange={changeCardLink} />
            <span className="form__input-error url-input-error" id="url-input-error" />
        </label>
    </PopupWithForm>
)
}

export default AddPlacePopup;