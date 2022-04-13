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
                        />
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;