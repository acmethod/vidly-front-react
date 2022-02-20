import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Movies from './Components/movies'
import Customers from './Components/customers';
import Rentals from './Components/rentals'
import NotFound from './Components/notFound';
import NavBar from './Components/common/navBar';
import MovieForm from './Components/movieForm'
import LoginForm from './Components/loginForm'
import RegisterForm from './Components/registerForm'
import ProtectedRoute from './Components/common/protectedRoutes';
import Logout from './Components/logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);   
    // Pass an empty array instructing we only want this once, the first time it's rendered.
  }, []);

  return (
    <React.Fragment> 
      <NavBar user={user}/>
      <main className="container"> 
        <Routes>
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route element={<ProtectedRoute user={user}/>}>   
            <Route path="/movies/:id" element={<MovieForm/>} />
          </Route>         
          <Route path="/movies" element={<Movies user={user}/>} />
          <Route path='/customers' element={<Customers/>}/>
          <Route path='/rentals' element={<Rentals/>}/>          
          <Route path='/' element={<Navigate to="/movies"/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
