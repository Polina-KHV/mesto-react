import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Card from './Card';
import { api } from '../utils/api';



function App() {

  // Получаем данные пользователя с бэкенда при отрисовке страницы
  const [userAvatar, setUserAvatar] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();

  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setUserAvatar(data.avatar);
      setUserName(data.name);
      setUserDescription(data.about);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


  // Получаем массив карточек с бэкенда при отрисовке страницы
  const [cards, createCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
    .then((data) => {
      createCards(
        data.map((item) => ({
          id: item._id,
          link: item.link,
          name: item.name,
          likes: item.likes.length,
        }))
      )
    })
  }, []);



  // Обрабатываем открывание Popup Avatar Update
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  React.useEffect(() => {
    document.querySelector('.popup_type_avatar-update').classList.toggle('popup_opened', isEditAvatarPopupOpen);
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };



  // Обрабатываем открывание Profile Info
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  React.useEffect(() => {
    document.querySelector('.popup_type_profile-information').classList.toggle('popup_opened', isEditProfilePopupOpen)
  });

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };



  // Обрабатываем открывание Place Addition
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  React.useEffect(() => {
    document.querySelector('.popup_type_place-addition').classList.toggle('popup_opened', isAddPlacePopupOpen)
  });

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };



  


  // Обрабатываем открывание Popup Card
  const [selectedCard, setSelectedCard] = React.useState('');
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  
  React.useEffect(() => {
    document.querySelector('.popup_type_card').classList.toggle('popup_opened', isCardPopupOpen);
  });



  // Обрабатываем закрывание попапов
  function closeAllPopups(evt) {
    evt.target.closest(".popup").classList.remove('popup_opened');

    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false)
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

        userAvatar={userAvatar}
        userName={userName}
        userDescription={userDescription}

        cardGrid={
          cards.map((card) =>
            <Card
              key={card.id}
              cardLink={card.link}
              cardName={card.name}
              cardLikes={card.likes}              

              onCardClick={
                function handleCardClick() {
                  setSelectedCard(card);
                  setIsCardPopupOpen(true);
                }

              }
            />
          )
        }
       />

      <Footer />

      {/* Popup Avatar Update */}
      <PopupWithForm
        name="avatar-update"
        title="Обновить аватар"
        buttonText="Сохранить"
        children={
          <input type="url" className="popup__input" name="avatar" id="avatar-input" placeholder="Ссылка на картинку" required />
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      {/* Popup Profile Info */}
      <PopupWithForm
        name="profile-information"
        title="Редактировать профиль"
        buttonText="Сохранить"
        children={
          <>
            <input type="text" className="popup__input" name="name" id="name-input" value="" minLength="2" maxLength="40" required />
            <span className="popup__input-error name-input-error"></span>
            <input type="text" className="popup__input" name="job" id="job-input" value="" minLength="2" maxLength="200" required />
            <span className="popup__input-error job-input-error"></span>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      {/* Popup Place Addition */}
      <PopupWithForm
        name="place-addition"
        title="Новое место"
        buttonText="Создать"
        children={
          <>
            <input type="text" className="popup__input" name="place" id="place-input" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__input-error place-input-error"></span>
            <input type="url" className="popup__input" name="link" id="link-input" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error link-input-error"></span>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      {/* Popup Delete Confirmation */}
      <PopupWithForm
        name="delete-confirmation"
        title="Вы уверены?"
        buttonText="Да"
        children=""
      />

      {/* Popup Card */}
      <ImagePopup
        cardLink={selectedCard.link}
        cardName={selectedCard.name}
        onClose={closeAllPopups}
      />
      
    </div>
  </div>
  );
}

export default App;