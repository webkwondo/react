import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import AccountPage from './pages/AccountPage/AccountPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Footer from './components/Footer/Footer';

const App = () => {
  const [currentPageName, setCurrentPageName] = useState('Home');

  const handlePageChange = (pageName: string) => {
    setCurrentPageName(pageName);
  };

  return (
    <div className="page">
      <Header currentPageName={currentPageName} />
      <Routes>
        <Route path="/" element={<HomePage onPageChange={handlePageChange} />} />
        <Route path="/about" element={<AboutPage onPageChange={handlePageChange} />} />
        <Route path="/account" element={<AccountPage onPageChange={handlePageChange} />} />
        <Route path="*" element={<NotFoundPage onPageChange={handlePageChange} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
