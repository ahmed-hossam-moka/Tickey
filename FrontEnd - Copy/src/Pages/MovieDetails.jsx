// // src/Pages/MovieDetails.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import useHallStore from "../store/hallStore";
// import useShowtimeStore from "../store/showtimesStore";
// import "../styles/movieDetails.css";

// const MovieDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { movie } = location.state || {};

//   const { halls, loading: hallsLoading, fetchHalls } = useHallStore();
//   const {
//     showtimes,
//     loading: showtimesLoading,
//     fetchShowtimesByMovie,
//   } = useShowtimeStore();
//   const [hallShowtimes, setHallShowtimes] = useState({});

//   useEffect(() => {
//     if (!movie) {
//       navigate("/");
//       return;
//     }

//     // Fetch halls and showtimes
//     fetchHalls();
//     if (movie.id) {
//       fetchShowtimesByMovie(movie.id)
//         .then((data) => {
//           if (!data || data.length === 0) {
//             console.warn("No showtimes found for movie:", movie.id);
//             setHallShowtimes({});
//             return;
//           }

//           // Group showtimes by hall
//           const grouped = data.reduce((acc, showtime) => {
//             const hallId = showtime.hallId;
//             if (!acc[hallId]) {
//               acc[hallId] = [];
//             }
//             acc[hallId].push(showtime.showTime);
//             return acc;
//           }, {});
//           console.log("Grouped showtimes:", grouped);
//           setHallShowtimes(grouped);
//         })
//         .catch((error) => {
//           console.error("Error fetching showtimes:", error);
//         });
//     }
//   }, [movie, navigate, fetchHalls, fetchShowtimesByMovie]);

//   const handleSelectShowtime = (hall, showtime) => {
//     navigate("/seat-selection", {
//       state: { movie, hall, showtime },
//     });
//   };

//   if (!movie) {
//     return null;
//   }

//   const loading = hallsLoading || showtimesLoading;

//   return (
//     <div className="movie-details-page">
//       <div className="container">
//         <button className="btn-back" onClick={() => navigate(-1)}>
//           <i className="bi bi-arrow-left"></i> Back
//         </button>

//         <div className="details-header">
//           <div className="row g-4 align-items-center">
//             <div className="col-lg-4">
//               <img
//                 src={movie.image}
//                 alt={movie.title}
//                 className="details-poster"
//               />
//             </div>
//             <div className="col-lg-8">
//               <h1 className="details-title">{movie.title}</h1>
//               <p className="details-description">{movie.description}</p>
//               <div className="details-meta">
//                 <span className="meta-item">
//                   <i className="bi bi-clock"></i> {movie.duration}
//                 </span>
//                 <span className="meta-item">
//                   <i className="bi bi-star-fill"></i> {movie.rating}
//                 </span>
//                 {movie.genre && (
//                   <span className="meta-item">
//                     <i className="bi bi-film"></i> {movie.genre}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="showtimes-section">
//           <h2 className="section-title">Select Hall & Showtime</h2>

//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : halls.length === 0 ? (
//             <div className="col-12">
//               <div className="alert alert-warning text-center">
//                 No halls available at the moment.
//               </div>
//             </div>
//           ) : Object.keys(hallShowtimes).length === 0 ? (
//             <div className="col-12">
//               <div className="alert alert-info text-center">
//                 No showtimes available for this movie at the moment.
//               </div>
//             </div>
//           ) : (
//             <div className="row g-4">
//               {halls.map((hall) => {
//                 const times = hallShowtimes[hall.id] || [];

//                 // If no showtimes for this hall, skip it
//                 if (times.length === 0) {
//                   return null;
//                 }

//                 return (
//                   <div key={hall.id} className="col-12">
//                     <div className="hall-card">
//                       <div className="hall-header">
//                         <div>
//                           <h4 className="hall-name">{hall.name}</h4>
//                           {hall.type && (
//                             <span className="hall-type">{hall.type}</span>
//                           )}
//                         </div>
//                         <i className="bi bi-geo-alt hall-icon"></i>
//                       </div>
//                       <div className="showtimes-grid">
//                         {times.map((time, index) => (
//                           <button
//                             key={index}
//                             className="showtime-btn"
//                             onClick={() => handleSelectShowtime(hall, time)}
//                           >
//                             <i className="bi bi-calendar-event"></i>
//                             {time}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// src/Pages/MovieDetails.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useHallStore from "../store/hallStore";
import useShowtimeStore from "../store/showtimesStore";
import "../styles/movieDetails.css";

const MovieDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie } = location.state || {};

  const { halls, loading: hallsLoading, fetchHalls } = useHallStore();
  const {
    showtimes,
    loading: showtimesLoading,
    fetchShowtimesByMovie,
  } = useShowtimeStore();
  const [hallShowtimes, setHallShowtimes] = useState({});

  useEffect(() => {
    if (!movie) {
      navigate("/");
      return;
    }

    // Fetch halls and showtimes
    fetchHalls();
    if (movie.id) {
      fetchShowtimesByMovie(movie.id)
        .then((data) => {
          if (!data || data.length === 0) {
            console.warn("No showtimes found for movie:", movie.id);
            setHallShowtimes({});
            return;
          }

          // Group showtimes by hall - Keep full showtime objects
          const grouped = data.reduce((acc, showtime) => {
            const hallId = showtime.hallId;
            if (!acc[hallId]) {
              acc[hallId] = [];
            }
            // Store the complete showtime object instead of just the time
            acc[hallId].push(showtime);
            return acc;
          }, {});
          console.log("Grouped showtimes:", grouped);
          setHallShowtimes(grouped);
        })
        .catch((error) => {
          console.error("Error fetching showtimes:", error);
        });
    }
  }, [movie, navigate, fetchHalls, fetchShowtimesByMovie]);

  const handleSelectShowtime = (hall, showtimeObj) => {
    console.log("Navigating with showtime object:", showtimeObj);
    navigate("/seat-selection", {
      state: { 
        movie, 
        hall, 
        showtime: showtimeObj  // Pass the complete showtime object with id
      },
    });
  };

  if (!movie) {
    return null;
  }

  const loading = hallsLoading || showtimesLoading;

  return (
    <div className="movie-details-page">
      <div className="container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>

        <div className="details-header">
          <div className="row g-4 align-items-center">
            <div className="col-lg-4">
              <img
                src={movie.image}
                alt={movie.title}
                className="details-poster"
              />
            </div>
            <div className="col-lg-8">
              <h1 className="details-title">{movie.title}</h1>
              <p className="details-description">{movie.description}</p>
              <div className="details-meta">
                <span className="meta-item">
                  <i className="bi bi-clock"></i> {movie.duration}
                </span>
                <span className="meta-item">
                  <i className="bi bi-star-fill"></i> {movie.rating}
                </span>
                {movie.genre && (
                  <span className="meta-item">
                    <i className="bi bi-film"></i> {movie.genre}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="showtimes-section">
          <h2 className="section-title">Select Hall & Showtime</h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : halls.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-warning text-center">
                No halls available at the moment.
              </div>
            </div>
          ) : Object.keys(hallShowtimes).length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No showtimes available for this movie at the moment.
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {halls.map((hall) => {
                const showtimeObjects = hallShowtimes[hall.id] || [];

                // If no showtimes for this hall, skip it
                if (showtimeObjects.length === 0) {
                  return null;
                }

                return (
                  <div key={hall.id} className="col-12">
                    <div className="hall-card">
                      <div className="hall-header">
                        <div>
                          <h4 className="hall-name">{hall.name}</h4>
                          {hall.type && (
                            <span className="hall-type">{hall.type}</span>
                          )}
                        </div>
                        <i className="bi bi-geo-alt hall-icon"></i>
                      </div>
                      <div className="showtimes-grid">
                        {showtimeObjects.map((showtimeObj, index) => (
                          <button
                            key={showtimeObj.id || index}
                            className="showtime-btn"
                            onClick={() => handleSelectShowtime(hall, showtimeObj)}
                          >
                            <i className="bi bi-calendar-event"></i>
                            {showtimeObj.showTime}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;