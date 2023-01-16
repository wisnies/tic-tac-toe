import styles from '../../../styles/Layout.module.scss';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLogo}></div>
        <nav className={styles.headerNav}>
          <Link to='/' className={styles.headerLink}>
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};
