import { useGameContext } from '../../../context/gameContext';
import Grid from '../../board/Grid';
import Square from '../../board/Square';

export const Board: React.FC = () => {
  const { board, handleSquareClick } = useGameContext();

  return (
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
  );
};
