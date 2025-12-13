import PropTypes from "prop-types";
import "../styles/card.css";

export default function Card({
  cardName,
  badge,
  image,
  alt,
  title,
  description,
  duration,
  rating,
  onBookNow, 
}) {
  return (
    <>
      <div className={cardName}>
        <span className="badge-new">{badge}</span>
        <img src={image} className="movie-card-img" alt={alt} />
        <div className="movie-card-body">
          <h5 className="movie-card-title">{title}</h5>
          <p className="movie-card-text">{description}</p>
          <div className="d-flex align-items-center justify-content-between">
            <small className="text-secondary">
              <i className="bi bi-clock"></i> {duration}
            </small>
            <small className="text-secondary">
              <i className="bi bi-star-fill text-warning"></i> {rating}
            </small>
          </div>
          <button 
            className="btn btn-ticket"
            onClick={onBookNow} 
          >
            <i className="bi bi-ticket-perforated"></i> Book Now
          </button>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  cardName: PropTypes.string,
  badge: PropTypes.string,
  image: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
  rating: PropTypes.string,
  onBookNow: PropTypes.func, // Add this
};