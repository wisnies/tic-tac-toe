import { BrowserRouter as Router } from 'react-router-dom';
import RouteViews from './components/layout/RouteViews';
import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { BoardContextProvider } from './context/boardContext';
import { GameContextProvider } from './context/gameContext';

export const App: React.FC = () => {
  return (
    <BoardContextProvider>
      <GameContextProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <RouteViews />
          <Footer />
        </Router>
      </GameContextProvider>
    </BoardContextProvider>
  );
};
