import React from 'react';
import Card from './Card';
import { api } from '../utils/api';



function Main(props) {
  
  // Получаем данные пользователя с бэкенда при отрисовке страницы
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');

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
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
    .then((data) => {
      setCards(
        data.map((item) => ({
          id: item._id,
          link: item.link,
          name: item.name,
          likes: item.likes.length,
        }))
      )
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);



  // Возвращаем разметку
  return (
    <main className="content">

      {/* Profile */}
      <section className="profile">
        <div className="profile__avatar-cover">
          <img src={userAvatar}  alt="Здесь должна быть ваша аватарка, но что-то пошло не так." className="profile__avatar" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      {/* Card-grid */}
      <section className="card-grid">
        <ul className="card-grid__container">
          {cards.map((card) =>
            <Card
              key={card.id}
              cardLink={card.link}
              cardName={card.name}
              cardLikes={card.likes}              

              card={card}
              onCardClick={
                function(card) {props.handleCardClick(card)}
              }
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;