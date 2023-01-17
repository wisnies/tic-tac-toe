import { useGameContext } from '../../../context/gameContext';

import styles from '../../../styles/Game.module.scss';

export const Details: React.FC = () => {
  const {
    gameCanStart,
    beginningPlayer,
    currentPlayer,
    vs,
    p1,
    p2,
    displayWinner,
  } = useGameContext();
  if (gameCanStart) {
    return (
      <div className={styles.details}>
        <h6>Playing versus: {vs === 'c' ? 'computer' : 'other player'}</h6>
        <div className={styles.detailsRow}>
          <div className={styles.detailsCol}>
            <p className={styles.playerText}>playerOne as:</p>
            <p className={p1 === 'x' ? styles.playerX : styles.playerO}>{p1}</p>
          </div>
          <div className={styles.detailsCol}>
            <p className={styles.playerText}>playerTwo as:</p>
            <p className={p2 === 'x' ? styles.playerX : styles.playerO}>{p2}</p>
          </div>
        </div>
        <div className={styles.detailsRow}>
          <div className={styles.detailsCol}>
            <p className={styles.playerText}>Beggining player:</p>
            <p
              className={
                beginningPlayer === 'x' ? styles.playerX : styles.playerO
              }
            >
              {beginningPlayer}
            </p>
          </div>
          <div className={styles.detailsCol}>
            <p className={styles.playerText}>CurrentTurn:</p>
            <p
              className={
                currentPlayer === 'x' ? styles.playerX : styles.playerO
              }
            >
              {currentPlayer}
            </p>
          </div>
        </div>

        <p className={styles.detailsResult}>{displayWinner()}</p>
      </div>
    );
  } else {
    return null;
  }
};
