import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';

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
          <Route path="*" element={<NotFoundPage onPageChange={this.handlePageChange} />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default App;
