import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick}) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `button  element__trash ${isOwn ? '' : 'element__trash_hidden'}`);

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`button element__like ${isLiked ? 'element__like_active' : ''}`);

    function handleCardClick() {
        onCardClick(card);
    }

    return(
        <li className="element">
            <img className="element__image" src={card.link} alt="Фото" onClick={handleCardClick}/>
            <button className={cardDeleteButtonClassName} type="button" />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} />
                    <span className="element__likes-count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;