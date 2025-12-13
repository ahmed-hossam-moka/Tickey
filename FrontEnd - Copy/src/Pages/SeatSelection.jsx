// // src/Pages/SeatSelection.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import useBookingStore from '../store/bookingStore';
// import useUserStore from '../store/userStore';
// import "../styles/seatSelection.css";

// const SeatSelection = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { movie, hall, showtime } = location.state || {};
  
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [timer, setTimer] = useState(360); // 6 minutes
//   const [seatLayout, setSeatLayout] = useState([]);

//   const { 
//     availableSeats, 
//     bookedSeats, 
//     loading, 
//     fetchAvailableSeats, 
//     fetchBookedSeats,
//     createBooking 
//   } = useBookingStore();
  
//   const { currentUser, isAuthenticated } = useUserStore();

//   useEffect(() => {
//     if (!movie || !hall || !showtime) {
//       navigate('/');
//       return;
//     }

//     // In a real scenario, you'd fetch seats based on showtime ID
//     // For now, we'll generate the layout
//     generateSeats();

//     // Start timer
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           navigate('/');
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [movie, hall, showtime, navigate]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const generateSeats = () => {
//     const layout = [];
//     const sections = [
//       { rows: 3, cols: 18, type: 'premium', label: 'A' },
//       { rows: 1, cols: 18, type: 'regular', label: 'D' },
//       { rows: 6, cols: 18, type: 'regular', label: 'E' }
//     ];

//     // Simulated unavailable seats
//     const unavailableSeats = ['A2-3', 'A2-4', 'D1-8', 'D1-9', 'E4-9', 'E6-1', 'E6-2', 'E6-3', 'E6-4', 'E6-5', 'E6-6', 'E6-7'];

//     sections.forEach(section => {
//       for (let row = 0; row < section.rows; row++) {
//         const seats = [];
//         const rowLabel = String.fromCharCode(section.label.charCodeAt(0) + row);
        
//         for (let col = 1; col <= section.cols; col++) {
//           const seatId = `${rowLabel}${row + 1}-${col}`;
//           seats.push({
//             id: seatId,
//             type: section.type,
//             available: !unavailableSeats.includes(seatId)
//           });
//         }
//         layout.push({ rowLabel, seats });
//       }
//     });

//     setSeatLayout(layout);
//   };

//   const toggleSeat = (seatId, available) => {
//     if (!available) return;
    
//     setSelectedSeats(prev => 
//       prev.includes(seatId) 
//         ? prev.filter(id => id !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const getSeatClass = (seat) => {
//     if (!seat.available) return 'seat unavailable';
//     if (selectedSeats.includes(seat.id)) return 'seat selected';
//     return `seat ${seat.type}`;
//   };

//   const handleConfirmBooking = async () => {
//     if (!isAuthenticated) {
//       alert('Please login to book tickets');
//       navigate('/login');
//       return;
//     }

//     if (selectedSeats.length === 0) {
//       alert('Please select at least one seat');
//       return;
//     }

//     try {
//       // In a real app, you'd need the actual showtime ID and seat IDs from the API
//       const bookingData = {
//         userId: currentUser.userId,
//         showtimeId: 1, // This should come from the showtime object
//         seatIds: selectedSeats.map((_, index) => index + 1) // Mock seat IDs
//       };

//       await createBooking(bookingData);
//       alert('Booking confirmed successfully!');
//       navigate('/');
//     } catch (error) {
//       alert('Booking failed: ' + error.message);
//     }
//   };

//   if (!movie || !hall || !showtime) return null;

//   return (
//     <div className="seat-selection-page">
//       <div className="container">
//         <div className="selection-header">
//           <button className="btn-back" onClick={() => navigate(-1)}>
//             <i className="bi bi-arrow-left"></i> Back
//           </button>
//           <div className="timer">
//             <i className="bi bi-clock"></i>
//             {formatTime(timer)}
//           </div>
//         </div>

//         <h2 className="page-title">CHOOSE SEATS</h2>

//         <div className="booking-info">
//           <h3>{movie.title}</h3>
//           <p>{hall.name} - {showtime}</p>
//         </div>

//         {loading ? (
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading seats...</span>
//             </div>
//           </div>
//         ) : (
//           <div className="theater-container">
//             <div className="screen">SCREEN</div>
            
//             <div className="seats-container">
//               {seatLayout.map((row, rowIndex) => (
//                 <div key={rowIndex} className="seat-row">
//                   {row.seats.map(seat => (
//                     <button
//                       key={seat.id}
//                       className={getSeatClass(seat)}
//                       onClick={() => toggleSeat(seat.id, seat.available)}
//                       disabled={!seat.available}
//                       title={seat.id}
//                     />
//                   ))}
//                 </div>
//               ))}
//             </div>

//             <div className="legend">
//               <div className="legend-item">
//                 <span className="seat unavailable"></span>
//                 Unavailable
//               </div>
//               <div className="legend-item">
//                 <span className="seat selected"></span>
//                 Your Seat
//               </div>
//               <div className="legend-item">
//                 <span className="seat regular"></span>
//                 Regular
//               </div>
//               <div className="legend-item">
//                 <span className="seat premium"></span>
//                 Premium
//               </div>
//             </div>
//           </div>
//         )}

//         {selectedSeats.length > 0 && (
//           <div className="booking-summary">
//             <div className="summary-content">
//               <div>
//                 <strong>Selected Seats:</strong> {selectedSeats.join(', ')}
//               </div>
//               <div>
//                 <strong>Total: </strong>
//                 EGP {selectedSeats.length * 150}
//               </div>
//               <button 
//                 className="btn-confirm"
//                 onClick={handleConfirmBooking}
//                 disabled={loading}
//               >
//                 {loading ? 'Processing...' : 'Confirm Booking'}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SeatSelection;


// src/Pages/SeatSelection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useBookingStore from '../store/bookingStore';
import useUserStore from '../store/userStore';
import "../styles/seatSelection.css";

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, hall, showtime } = location.state || {};
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timer, setTimer] = useState(360); // 6 minutes
  const [seatLayout, setSeatLayout] = useState([]);

  const { 
    availableSeats, 
    bookedSeats, 
    loading, 
    fetchAvailableSeats, 
    fetchBookedSeats,
    createBooking 
  } = useBookingStore();
  
  const { currentUser, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (!movie || !hall || !showtime) {
      navigate('/');
      return;
    }

    // Debug: Log the showtime object to see its structure
    console.log('Showtime object received:', showtime);
    console.log('Hall object received:', hall);

    // Fetch available and booked seats from backend
    const fetchSeats = async () => {
      try {
        // Try different possible property names for showtime ID
        const showtimeId = showtime.id || showtime.showtimeId || showtime.showTimeId;
        
        if (!showtimeId) {
          console.error('No showtime ID found. Showtime object:', showtime);
          alert('Invalid showtime data. Please select a showtime again.');
          navigate(-1);
          return;
        }

        console.log('Fetching seats for showtime ID:', showtimeId);

        await Promise.all([
          fetchAvailableSeats(showtimeId),
          fetchBookedSeats(showtimeId)
        ]);
      } catch (error) {
        console.error('Error fetching seats:', error);
        alert('Failed to load seats. Please try again.');
      }
    };

    fetchSeats();

    // Start timer
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [movie, hall, showtime, navigate]);

  // Generate seat layout when availableSeats and bookedSeats are loaded
  useEffect(() => {
    if (availableSeats.length > 0 || bookedSeats.length > 0) {
      generateSeats();
    }
  }, [availableSeats, bookedSeats]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateSeats = () => {
    if (!hall) return;

    // Calculate seat ID range for this hall
    const hallId = hall.id || hall.hallId;
    const startSeatId = (hallId - 1) * 10 + 1;
    const endSeatId = hallId * 10;

    console.log(`Generating seats for Hall ${hallId}: Seats ${startSeatId} to ${endSeatId}`);
    console.log('Available seats:', availableSeats);
    console.log('Booked seats:', bookedSeats);

    // Get booked seat IDs
    const bookedSeatIds = bookedSeats.map(seat => seat.id);
    
    // Create a map of all seats with their availability
    const allSeats = [];
    for (let seatId = startSeatId; seatId <= endSeatId; seatId++) {
      const seat = availableSeats.find(s => s.id === seatId) || 
                   bookedSeats.find(s => s.id === seatId);
      
      if (seat) {
        allSeats.push({
          ...seat,
          available: !bookedSeatIds.includes(seatId)
        });
      } else {
        // If seat doesn't exist in either list, create a placeholder
        allSeats.push({
          id: seatId,
          rowNo: Math.floor((seatId - startSeatId) / 5) + 1,
          seatNumber: ((seatId - startSeatId) % 5) + 1,
          type: 'regular',
          available: true
        });
      }
    }

    // Organize seats into rows (2 rows of 5 seats each for 10 seats)
    const layout = [];
    const seatsPerRow = 5;
    const numberOfRows = 2;

    for (let row = 0; row < numberOfRows; row++) {
      const rowLabel = String.fromCharCode(65 + row); // A, B, C...
      const seats = [];
      
      for (let col = 0; col < seatsPerRow; col++) {
        const seatIndex = row * seatsPerRow + col;
        if (seatIndex < allSeats.length) {
          const seat = allSeats[seatIndex];
          seats.push({
            id: seat.id,
            rowNo: seat.rowNo,
            seatNumber: seat.seatNumber,
            type: seat.type || 'regular',
            available: seat.available
          });
        }
      }
      
      layout.push({ rowLabel, seats });
    }

    setSeatLayout(layout);
  };

  const toggleSeat = (seatId, available) => {
    if (!available) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClass = (seat) => {
    if (!seat.available) return 'seat unavailable';
    if (selectedSeats.includes(seat.id)) return 'seat selected';
    return `seat ${seat.type}`;
  };

  const handleConfirmBooking = async () => {
    if (!isAuthenticated) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    try {
      const showtimeId = showtime.id || showtime.showtimeId || showtime.showTimeId;
      
      const bookingData = {
        userId: currentUser.userId || currentUser.id,
        showtimeId: showtimeId,
        seatIds: selectedSeats
      };

      console.log('Creating booking with data:', bookingData);
      await createBooking(bookingData);
      alert('Booking confirmed successfully!');
      navigate('/my-Bookings');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed: ' + error.message);
    }
  };

  if (!movie || !hall || !showtime) return null;

  return (
    <div className="seat-selection-page">
      <div className="container">
        <div className="selection-header">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <div className="timer">
            <i className="bi bi-clock"></i>
            {formatTime(timer)}
          </div>
        </div>

        <h2 className="page-title">CHOOSE SEATS</h2>

        <div className="booking-info">
          <h3>{movie.title}</h3>
          <p>{hall.name} - {showtime.showTime || showtime.time}</p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading seats...</span>
            </div>
          </div>
        ) : seatLayout.length === 0 ? (
          <div className="text-center py-5">
            <p>No seats available for this showtime.</p>
          </div>
        ) : (
          <div className="theater-container">
            <div className="screen">SCREEN</div>
            
            <div className="seats-container">
              {seatLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  <span className="row-label">{row.rowLabel}</span>
                  {row.seats.map(seat => (
                    <button
                      key={seat.id}
                      className={getSeatClass(seat)}
                      onClick={() => toggleSeat(seat.id, seat.available)}
                      disabled={!seat.available}
                      title={`Row ${seat.rowNo}, Seat ${seat.seatNumber}`}
                    >
                      {seat.seatNumber}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="legend">
              <div className="legend-item">
                <span className="seat unavailable"></span>
                Unavailable
              </div>
              <div className="legend-item">
                <span className="seat selected"></span>
                Your Seat
              </div>
              <div className="legend-item">
                <span className="seat regular"></span>
                Regular
              </div>
              <div className="legend-item">
                <span className="seat premium"></span>
                Premium
              </div>
            </div>
          </div>
        )}

        {selectedSeats.length > 0 && (
          <div className="booking-summary">
            <div className="summary-content">
              <div>
                <strong>Selected Seats:</strong> {selectedSeats.length} seat(s)
              </div>
              <div>
                <strong>Total: </strong>
                EGP {selectedSeats.length * 150}
              </div>
              <button 
                className="btn-confirm"
                onClick={handleConfirmBooking}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;