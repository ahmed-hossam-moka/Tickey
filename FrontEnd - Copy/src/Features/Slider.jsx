
import "../styles/slider.css"
const Slider = () => {
  return (
    <>
      <section className="slider py-4">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade col-lg-10 mx-auto"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide-to="2"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="src/assets/El-Selem-W-El-Thoban-_1763011754.jpg"
                className="d-block w-100"
                alt="Movie"
              />
            </div>
            <div className="carousel-item">
              <img
                src="src/assets/Al-Sada-Al-Afadel_1761291496.jpg"
                className="d-block w-100"
                alt="Movie"
              />
            </div>
            <div className="carousel-item">
              <img
                src="src/assets/Wlana-fel5yal-7ob.jpg"
                className="d-block w-100"
                alt="Movie"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Slider;
