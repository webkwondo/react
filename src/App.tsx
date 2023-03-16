import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
