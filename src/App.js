import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// Pages
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Book from './pages/Book/Book';
import Persons from './pages/Persons/Persons';
import Person from './pages/Person/Person';
import News from './pages/News/News';
import InfoNews from './pages/InfoNews/InfoNews';
import About from './pages/About/About';
import Feedback from './pages/Feedback/Feedback';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
import UserProfile from './pages/UserProfile/UserProfile';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/book/:id" element={<Book />} />
                <Route path="/persons" element={<Persons />} />
                <Route path="/persons/:id" element={<Person />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<InfoNews />} />
                <Route path="/about" element={<About />} />
                <Route path="/feedback" element={<Feedback />} />

                {/* Auth routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />

                {/* Protected student routes */}
                <Route
                  path="/user"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />

              </Routes>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
