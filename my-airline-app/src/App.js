import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import ReactDOM from 'react-dom';



import Login from './components/auth/login';
import LogOut from './components/auth/logout';
import Signup from './components/auth/Signup';
import ExecutiveSignup from './components/auth/executivesignup';
import CustomerSignup from './components/auth/customsinup';
import AirlineSignup from './components/auth/airlinesignup';
import CustomerDashboard from './components/customer/components/dashboard';
import ExecutiveDashboard from './components/executive/edashboard';
import AddFlight from './components/airline/components/flightadd';
import AccordionSection from './components/executive/ehome';
import Airlinedashboard from './components/airline/components/Adashboard';
import NavbarComponent from './components/customer/components/navbar';
import PreviousBookings from './components/customer/components/previous';
import OffersPage from './components/customer/components/promo';
import HomeComponent from './components/customer/components/home';
import CustomerHelpPage from './components/customer/components/customerhelp';
import ENavbarComponent from './components/executive/enavbar';
import AddAirline from './components/executive/addairline';
import DeleteAirline from './components/executive/deleteairline';
import GetAllAirlines from './components/executive/viewairline';
import CustomerBookings from './components/customer/components/previous';
import SearchResultsPage from './components/customer/components/searchresult';
import BookingPage from './components/customer/components/booking';
import RouteSlider from './components/airline/routeslider';
import FlightRoute from './components/airline/components/route';
import ShowRoutes from './components/airline/components/showroutes';
import AddFlightForm from './components/airline/components/addflight';
import SeatAvailability from './components/customer/seatavalibility';
import ConfirmationPage from './components/customer/components/confirmation';

import RouteAccordion from './components/airline/components/routeaccordino';
import UpdateFlight from './components/airline/components/updateFlight';
import AirlineHelp from './components/airline/components/airlinehelp';
import SeatAddition from './components/airline/components/addingseats';
import FlightsPage from './components/airline/components/allflights';
import YourParentComponent from './components/airline/components/parentsinup';

// Import other components

function App() {
  return (
    <AuthProvider>
      <div className='App'>
     
          <Routes>
            
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/logout" element={<LogOut />} />
            <Route path="/auth/executivesignup" element={<ExecutiveSignup />} />
            <Route path="/auth/customsinup" element={<CustomerSignup />} />
            <Route path="/auth/airlinesignup" element={<AirlineSignup />} />
            <Route path='/customer/components/dashboard' element={<CustomerDashboard />} />
            <Route path='/executive/edashboard' element={<ExecutiveDashboard />} />
            <Route path='/executive/ehome' element={<AccordionSection/>} />
            <Route path='/airline/components/adashboard' element={<Airlinedashboard />} />
            <Route path='/airline/components/addingseats' element={<SeatAddition />} />
            <Route path='/airline/components/routeslider' element={<RouteSlider />} />
            <Route path='/airline/components/showroutes' element={<ShowRoutes />} />
            <Route path='/airline/components/allflights' element={<FlightsPage />} />
            <Route path='/airline/components/routeaccordino' element={<RouteAccordion/>} />
            <Route path='/airline/components/flightadd' element={<AddFlight/>} />
            <Route path='/airline/components/route' element={<FlightRoute />} />
            <Route path='/airline/components/addflight' element={<AddFlightForm/>} />
            <Route path='/airline/components/parentsinup' element={<YourParentComponent/>} />
            <Route path='/airline/components/updateFlight' element={<UpdateFlight/>} />
            <Route path='/airline/components/airlinehelp' element={<AirlineHelp/>} />
            <Route path='/customer/components/promo' element={<OffersPage/>}/>
            <Route path='/' element={<HomeComponent/>}/>
            <Route path='/customer/components/previous' element={<CustomerBookings/>}/>
            <Route path='/customer/components/confirmation' element={<ConfirmationPage/>}/>
            <Route path='/customer/components/seatavalibility' element={<SeatAvailability/>}/>
            <Route path='/customer/components/searchresult' element={<SearchResultsPage/>}/>
            <Route path='/customer/components/navbar' element={<NavbarComponent/>}/>
            <Route path='/customer/components/customerhelp' element={<CustomerHelpPage/>}/>
            <Route path='/customer/components/booking' element={<BookingPage />} />
            <Route path='/customer/components/booking/:fid' element={<BookingPage />} />
            <Route path='/executive/components/enavbar' element={<ENavbarComponent/>}/>
            <Route path='/executive/addairline' element={<AddAirline />} />
            <Route path='/executive/deleteairline' element={<DeleteAirline />} />
            <Route path='/executive/viewairline' element={<GetAllAirlines />} />

          </Routes>
        
      </div>
    </AuthProvider>
  );
}

export default App;
