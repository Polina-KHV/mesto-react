function Card(props) {
  return (
    <div id="card-template">
        <li className="card-grid__item"> 
          <img className="card-grid__image" src={`${props.cardLink}`} alt={`${props.cardName}`} onClick={props.onCardClick} />
          <div className="card-grid__content">
            <h2 className="card-grid__name">{props.cardName}</h2>
            <div className="card-grid__like-content">
              <button className="card-grid__like-button" type="button"></button>
              <p className="card-grid__likes-amount">{props.cardLikes}</p>
            </div>
          </div>
          <button className="card-grid__delete-button" type="button"></button>
        </li>
      </div>
  );
}

export default Card; 