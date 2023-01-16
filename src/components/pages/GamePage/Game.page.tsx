import { useNavigate, useParams } from 'react-router-dom';
import { useGameContext } from '../../../context/gameContext';
import Grid from '../../board/Grid';
import Square from '../../board/Square';

export const GamePage: React.FC = () => {
  const { against } = useParams();
  const navigate = useNavigate();

  const {
    board,
    handleSquareClick,
    gameEnded,
    winner,
    restartGame,
    beginningPlayer,
    currentPlayer,
  } = useGameContext();
  return (
    <>
      <p>BeginningPlayer: {beginningPlayer}</p>
      <p>Current player: {currentPlayer}</p>
      <Grid>
        {board.map((symbol, i) => (
          <Square
            key={i}
            handleClick={() => {
              handleSquareClick(i);
            }}
            symbol={symbol}
          />
        ))}
      </Grid>
      <p>Game ended: {JSON.stringify(gameEnded)}</p>
      <p>Game result: {winner}</p>
      <button onClick={restartGame}>restart</button>
    </>
  );
};
