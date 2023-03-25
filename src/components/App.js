import {useState, useEffect} from 'react';
import { api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { UserContext } from '../contexts/CurrentUserContext';

function App() {

  // Стейты
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);





  // Загружаем данные пользователя
  useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Загружаем массив карточек
  useEffect(() => {
    api.getInitialCards()
    .then((data) => {
      setCards(
        data.map((item) => ({
          _id: item._id,
          link: item.link,
          name: item.name,
          likes: item.likes,
          owner: item.owner
        }))
      )
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // Обрабатываем лайк карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем удаление карточек
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    }
    )
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем сабмит формы Place Addition
  // Добавляем карточку
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем сабмит формы Profile Info
  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем сабмит формы Avatar Update
  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // Обрабатываем открывание попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Обрабатываем закрывание попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">

          <Header />

          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            handleCardClick={
              function(card){
                setSelectedCard(card);
                setIsCardPopupOpen(true);
              }
            }
            handleLikeClick={
              function(card) {handleCardLike(card)}
            }
            handleDeleteClick={
              function(card) {handleCardDelete(card)}
            }
          />

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

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
    </UserContext.Provider>
  );
}

export default App;