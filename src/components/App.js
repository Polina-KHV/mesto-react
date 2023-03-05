import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {

  // Обрабатываем открывание Popup Avatar Update
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };



  // Обрабатываем открывание Profile Info
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };



  // Обрабатываем открывание Place Addition
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };



  // Обрабатываем открывание Popup Card
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);



  // Обрабатываем закрывание попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
  };



  // Возвращаем разметку
  return (
  <div className="page">
    <div className="page__container">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}

        handleCardClick={
          function(card){
            setSelectedCard(card);
            setIsCardPopupOpen(true);
          }
        }
      />

      <Footer />

      {/* Popup Avatar Update */}
      <PopupWithForm
        name="avatar-update"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type="url" className="popup__input" name="avatar" id="avatar-input" placeholder="Ссылка на картинку" required />
      </PopupWithForm>

      {/* Popup Profile Info */}
      <PopupWithForm
        name="profile-information"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" className="popup__input" name="name" id="name-input"  minLength="2" maxLength="40" required />
        <span className="popup__input-error name-input-error"></span>
        <input type="text" className="popup__input" name="job" id="job-input"  minLength="2" maxLength="200" required />
        <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>

      {/* Popup Place Addition */}
      <PopupWithForm
        name="place-addition"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" className="popup__input" name="place" id="place-input" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error place-input-error"></span>
        <input type="url" className="popup__input" name="link" id="link-input" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error link-input-error"></span>
      </PopupWithForm>

      {/* Popup Delete Confirmation */}
      <PopupWithForm
        name="delete-confirmation"
        title="Вы уверены?"
        buttonText="Да"
      />

      {/* Popup Card */}
      <ImagePopup
        cardLink={selectedCard.link}
        cardName={selectedCard.name}
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups}
      />
      
    </div>
  </div>
  );
}

export default App;