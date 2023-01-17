export interface iGameContext {
  board: ('x' | 'o' | null)[];
  handleSquareClick: (i: number) => void;
  handleComputerMove: () => void;
  gameCanStart: boolean;
  gameEnded: boolean;
  winner: 'x' | 'o' | 'd' | null;
  restartGame: () => void;
  resetGame: () => void;
  beginningPlayer: 'x' | 'o';
  currentPlayer: 'x' | 'o';
  vs: 'c' | 'h';
  setVs: React.Dispatch<React.SetStateAction<'c' | 'h'>>;
  p1: 'x' | 'o';
  p2: 'x' | 'o';
  setPlayers: (symbol: 'x' | 'o') => void;
  displayWinner: () => string;
}
