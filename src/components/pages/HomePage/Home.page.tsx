import typography from '../../../styles/Typography.module.scss';
import styles from '../../../styles/Layout.module.scss';
import { Link } from 'react-router-dom';
import { useGameContext } from '../../../context/gameContext';
import { useEffect } from 'react';
export const HomePage: React.FC = () => {
  const { resetGame } = useGameContext();

  useEffect(() => {
    resetGame();
  }, [resetGame]);
  return (
    <section className={styles.section}>
      <h3 className={typography.title}>Play Versus:</h3>
      <div className={styles.btnRow}>
        <Link to='/play/player' className={styles.btnPrimary}>
          other player
        </Link>
        <Link to='/play/computer' className={styles.btnSecondary}>
          computer
        </Link>
      </div>
    </section>
  );
};
