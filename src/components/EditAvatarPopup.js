import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = ''
  } 

  return(
    <PopupWithForm
      name="avatar-update"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="url" className="popup__input" name="avatar" id="avatar-input" placeholder="Ссылка на картинку" required ref={avatarRef} />
    </PopupWithForm>
  )
};

export default EditAvatarPopup