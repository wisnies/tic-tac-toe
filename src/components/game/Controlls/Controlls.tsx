import { Link } from 'react-router-dom';
import { useGameContext } from '../../../context/gameContext';

import styles from '../../../styles/Game.module.scss';
import layout from '../../../styles/Layout.module.scss';

export const Controlls: React.FC = () => {
  const { restartGame, setPlayers, gameCanStart } = useGameContext();
  return (
    <div className={styles.controlls}>
      {gameCanStart ? (
        <div className={layout.btnRow}>
          <button className={layout.btnPrimary} onClick={restartGame}>
            restart
          </button>
          <Link className={layout.btnSecondary} to='/'>
            home
          </Link>
        </div>
      ) : (
        <>
          <p className={styles.controllsText}>
            Player One chooses their symbol:
          </p>
          <div className={layout.btnRow}>
            <button
              className={layout.btnSecondary}
              onClick={() => setPlayers('o')}
            >
              o
            </button>
            <button
              className={layout.btnPrimary}
              onClick={() => setPlayers('x')}
            >
              x
            </button>
          </div>
        </>
      )}
    </div>
  );
};
