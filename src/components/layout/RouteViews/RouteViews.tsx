import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import GamePage from '../../pages/GamePage';

import styles from '../../../styles/Layout.module.scss';

export const RouteViews: React.FC = () => {
  return (
    <main className={styles.main}>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/play/:opponent' element={<GamePage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </main>
  );
};
