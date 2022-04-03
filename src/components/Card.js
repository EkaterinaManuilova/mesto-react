import React from 'react';

function Card(props) {
    function handleCardClick() {
        props.onCardClick(props.card);
    }

    return(
        <li className="element">
            <img className="element__image" src={props.card.link} alt="Фото" onClick={handleCardClick}/>
            <button className="button  element__trash" type="button" />
            <div className="element__description">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__likes">
                    <button className="button element__like" />
                    <span className="element__likes-count">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;