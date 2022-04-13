import React from 'react';
import {useState} from "react";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmPopupOpen,  setIsConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    React.useEffect(() => {
        api.getProfile()
            .then(res => {
                const data = {
                    name: res.name,
                    about: res.about,
                    avatar: res.avatar,
                    _id: res._id
                }
                setCurrentUser(data);
            })
            .catch((err) => console.log(err))
    }, [])

    const [cards, setCards] = React.useState([]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then(
            (newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(
            () => {
                // Формируем новый массив на основе имеющегося, исключив из него удалённую карточку
                const newCards = cards.filter((c) => c._id !== card._id);
                // Обновляем стейт
                setCards(newCards);
            }
        )
    }

    React.useEffect(() => {
        api.getInitialCards()
            .then(cardsData =>  {
                setCards(cardsData)
            })
            .catch((err) => console.log(err))
    }, [])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleConfirmPopupClick() {
        setIsConfirmPopupOpen(!isConfirmPopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        api.editProfile(data)
            .then(profileData => {
                setCurrentUser(profileData);
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(data) {
        api.updateAvatar(data)
            .then(avatarData => {
                    setCurrentUser(avatarData);
                    closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then(
                (newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
            .catch((err) => console.log(err))
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setSelectedCard({});
    }

    return (
        <div className="container">
            <CurrentUserContext.Provider value={currentUser}>

                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onDeleteConfirm={handleConfirmPopupClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Footer />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ConfirmDeletePopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
