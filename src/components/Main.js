import React from 'react';
import editImage from "../images/edit-image.svg";
import addImage from "../images/add-image.svg";
import api from "../utils/api";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function  Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick})  {

    // const [userName, setUserName] = React.useState('');
    // const [userDescription, setUserDescription] = React.useState('');
    // const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    const currentUser = React.useContext(CurrentUserContext);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку, обновляем стейт
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card._id).then(() => {
            // Формируем новый массив на основе имеющегося, исключив удаленную карточку, обновляем стейт
            setCards((state) => state.filter((c) => c._id !== card._id));
        });
    }

    // React.useEffect(() => {
    //     api.getProfile()
    //         .then(res => {
    //             const data = {
    //                 name: res.name,
    //                 about: res.about,
    //                 avatar: res.avatar
    //             }
    //         setUserName(data.name);
    //         setUserDescription(data.about);
    //         setUserAvatar(data.avatar)
    //     })
    //         .catch((err) => console.log(err))
    // }, [])

    React.useEffect(() => {
        api.getInitialCards()
            .then(cardsData =>  {
                setCards(cardsData)
            })
            .catch((err) => console.log(err))
    }, [])

    return(
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar">
                        {currentUser.avatar && (<img className="profile__avatar-img" src={currentUser.avatar} alt="Аватар" />)}
                        <button type="button" className="profile__avatar-edit" onClick={onEditAvatar}/>
                    </div>
                    <h1 className="profile__username">{currentUser.name}</h1>
                    <p className="profile__job">{currentUser.about}</p>
                    <button className="button button_type_edit" type="button" onClick={onEditProfile}>
                        <img className="button__edit-image" src={editImage} alt="Карандаш" />
                    </button>
                    <button className="button button_type_add" type="button" onClick={onAddPlace}>
                        <img className="button__add-image" src={addImage} alt="Плюс" />
                    </button>
                </div>
            </section>
            <section className="cards">
                <ul className="elements">
                    {cards.map(card =>
                        <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        />
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;