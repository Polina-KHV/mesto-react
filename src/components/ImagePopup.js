function ImagePopup(props) {
  return (
    <section className="popup popup_type_card">
      <div className="popup__card-container">
        <figure className="popup__image-container">
          <img className="popup__image" src={`${props.cardLink}`} alt={`${props.cardName}`} />
          <figcaption className="popup__image-caption">{props.cardName}</figcaption>
        </figure>
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;