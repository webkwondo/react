import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import AccountPage from './pages/AccountPage/AccountPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Footer from './components/Footer/Footer';

interface IAppState {
  currentPageName: string;
}

class App extends React.Component<object, IAppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      currentPageName: 'Home',
    };
  }

  handlePageChange = (pageName: string) => {
    this.setState({ currentPageName: pageName });
  };

  render() {
    const { currentPageName } = this.state;

    return (
      <div className="page">
        <Header currentPageName={currentPageName} />
        <Routes>
          <Route path="/" element={<HomePage onPageChange={this.handlePageChange} />} />
          <Route path="/about" element={<AboutPage onPageChange={this.handlePageChange} />} />
          <Route path="/account" element={<AccountPage onPageChange={this.handlePageChange} />} />
          <Route path="*" element={<NotFoundPage onPageChange={this.handlePageChange} />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
