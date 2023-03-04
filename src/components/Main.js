function Main(props) {
  return (
    <main className="content">

      {/* Profile */}
      <section className="profile">
        <div className="profile__avatar-cover">
          <img src={`${props.userAvatar}`}  alt="Здесь должна быть ваша аватарка, но что-то пошло не так." className="profile__avatar" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{props.userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__job">{props.userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      {/* Card-grid */}
      <section className="card-grid">
        <ul className="card-grid__container">
          {props.cardGrid}
        </ul>
      </section>
    </main>
  );
}

export default Main;