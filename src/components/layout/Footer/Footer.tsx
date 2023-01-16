import styles from '../../../styles/Layout.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p>Mateusz Wiśniewski &copy; 2023 - {new Date().getFullYear()}</p>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/wisnies/tic-tac-toe'
        >
          Github Repo
        </a>
      </div>
    </footer>
  );
};
