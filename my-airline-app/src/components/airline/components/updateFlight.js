// import React, { useState, useEffect } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import AirlineNavbar from './anavabar';
// import { useParams ,useHistory } from 'react-router-dom';


// const UpdateFlight = () => {
//   const { id } = useParams();
//   const history = useHistory();

//   const [flightData, setFlightData] = useState({
//     code: '',
//     departureTime: '',
//     departureDate: '',
//     arrivalDate: '',
//     availableSeats: 0,
//     businessClassPrice: 0,
//     economyClassPrice: 0,
//     firstClassPrice: 0,
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFlightDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/flight/get/${id}`);
//         if (response.ok) {
//           const flightDetails = await response.json();
//           setFlightData(flightDetails);
//         } else {
//           setError('Failed to fetch flight details.');
//         }
//       } catch (error) {
//         setError(`Error fetching flight details: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFlightDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFlightData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const API_URL = `http://localhost:8081/flight/update/${id}`;

//     try {
//       const response = await fetch(API_URL, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(flightData),
//       });

//       if (response.ok) {
//         const updatedFlight = await response.json();
//         console.log('Flight updated successfully:', updatedFlight);
//         history.push('/airline-dashboard'); // Redirect to the dashboard after update
//       } else {
//         setError('Failed to update flight.');
//       }
//     } catch (error) {
//       setError(`Error updating flight: ${error.message}`);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <AirlineNavbar />
//       <div className="container mt-4">
//         <div className="shadow p-3 mb-5 bg-white rounded">
//           <h2>Update Flight</h2>
//           <form onSubmit={handleSubmit}>
//             {Object.keys(flightData).map((key) => (
//               <div key={key} className="mb-3">
//                 <label htmlFor={key} className="form-label">
//                   {key.charAt(0).toUpperCase() + key.slice(1)}:
//                 </label>
//                 <input
//                   type={key === 'availableSeats' ? 'number' : 'text'}
//                   name={key}
//                   value={flightData[key]}
//                   onChange={handleChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//             ))}
//             <button type="submit" className="btn btn-primary">
//               Update Flight
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateFlight;
