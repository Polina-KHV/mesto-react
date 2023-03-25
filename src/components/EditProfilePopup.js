import React from "react";
import PopupWithForm from "./PopupWithForm";
import { UserContext } from "../contexts/CurrentUserContext";



function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(evt) {
    setName(evt.target.value)
  };

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  };

  const currentUser = React.useContext(UserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
      evt.preventDefault();

      props.onUpdateUser({
        name,
        about: description,
      })
  };

  return(
    <PopupWithForm
      name="profile-information"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__input" name="name" id="name-input"  minLength="2" maxLength="40" required value={name} onChange={handleNameChange} />
      <span className="popup__input-error name-input-error"></span>
      <input type="text" className="popup__input" name="job" id="job-input"  minLength="2" maxLength="200" required value={description} onChange={handleDescriptionChange} />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  )
};

export default EditProfilePopup