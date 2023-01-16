import typography from '../../../styles/Typography.module.scss';
import styles from '../../../styles/Layout.module.scss';
import { Link } from 'react-router-dom';
export const HomePage: React.FC = () => {
  return (
    <section className={styles.section}>
      LOGO
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
