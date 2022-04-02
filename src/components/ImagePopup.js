import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`popup popup_type_image ${props.card && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button type="button" className="button button_type_close" onClick={props.onClose} />
                <img className="popup__image-link" src={`${props.card.link}`} alt="Фото" />
                <h2 className="popup__image-title">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;