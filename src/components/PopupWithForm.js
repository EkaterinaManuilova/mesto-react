import React from 'react';

function PopupWithForm(props) {
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="button button_type_close" onClick={props.onClose} />
                <h2 className="popup__title">{props.title}</h2>
                <form className="form form_type_edit" name={`${props.name}Form`} noValidate>
                    <div className="form__content">
                        {props.children}
                    </div>
                    <button type="submit" className="button button_type_submit">{props.textBtn}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;