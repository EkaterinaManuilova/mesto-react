import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] =React.useState('');

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard('');
    }

    return (
        <div className="container">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="edit"
                title={'Редактировать профиль'}
                textBtn={'Сохранить'}
                children={
                    <>
                        <label className="form__field">
                            <input className="form__input form__input_name_username" type="text" placeholder="Имя" name="username" id="username-input" required minLength={2} maxLength={40} />
                            <span className="form__input-error username-input-error" id="username-input-error" />
                        </label>
                        <label className="form__field">
                            <input className="form__input form__input_name_profession" type="text" placeholder="О себе" name="profession" id="profession-input" required minLength={2} maxLength={200} />
                            <span className="form__input-error profession-input-error" id="profession-input-error" />
                        </label>
                    </>
                }
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="add"
                title={'Новое место'}
                textBtn={'Создать'}
                children={
                    <>
                        <label className="form__field">
                            <input className="form__input form__input_name_title" type="text" placeholder="Название" name="name" id="title-input" required minLength={2} maxLength={30} />
                            <span className="form__input-error title-input-error" id="title-input-error" />
                        </label>
                        <label className="form__field">
                            <input className="form__input form__input_name_url" type="url" placeholder="Ссылка на картинку" name="link" id="url-input" required />
                            <span className="form__input-error url-input-error" id="url-input-error" />
                        </label>
                    </>
                }
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="avatar"
                title={'Обновить аватар'}
                textBtn={'Да'}
                children={
                    <label className="form__field">
                        <input className="form__input form__input_name_avatar" type="url" placeholder="Ссылка на новый аватар" name="avatar" id="avatar-input" required />
                        <span className="form__input-error avatar-input-error" id="avatar-input-error" />
                    </label>
                }
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="confirm"
                title={'Вы уверены?'}
                textBtn={'Да'}
                onClose={closeAllPopups}
            />
        </div>
    );
}

export default App;
