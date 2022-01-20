import React from 'react'
import logo from './logo.svg'
import { Routes, Route } from 'react-router-dom'
import TopBar from './components/nav/TopBar'
import LoginForm from './components/login/LoginForm'
import PrivateRoute from './components/login/PrivateRoute'
import './App.css'


function App() {
  return (
    <div className='App'>
      <TopBar></TopBar>
      <div className='wrapper'>
        <Routes>
          <Route path="/" element={ <div>Home</div> } />
          <Route path="/login" element={ <LoginForm /> } />
          <Route path="/dashboard" element={ 
              <PrivateRoute>
                <div>Dashboard</div>
              </PrivateRoute>
            } 
          />
          <Route path="*" element={ <div>404 nothing here</div> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
