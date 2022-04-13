import React from 'react';
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({isOpen, onClose}) {
    return (
        <PopupWithForm
            name="confirm"
            title='Вы уверены?'
            textBtn='Да'
            onClose={onClose}
            isOpen={isOpen}
            />
            )
}
export default ConfirmDeletePopup;
