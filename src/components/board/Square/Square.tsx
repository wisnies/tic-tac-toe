import styles from '../../../styles/Game.module.scss';

type SquareProps = {
  handleClick: () => void;
  symbol: 'x' | 'o' | null;
};

export const Square: React.FC<SquareProps> = ({
  handleClick,
  symbol,
}: SquareProps) => {
  return (
    <button
      onClick={() => handleClick()}
      className={symbol === 'x' ? styles.squareX : styles.squareO}
    >
      {symbol === null ? '' : symbol}
    </button>
  );
};
