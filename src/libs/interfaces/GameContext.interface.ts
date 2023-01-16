export interface iGameContext {
  board: ('x' | 'o' | null)[];
  handleSquareClick: (i: number) => void;
  gameEnded: boolean;
  winner: 'x' | 'o' | 'd' | null;
  restartGame: () => void;
  beginningPlayer: 'x' | 'o';
  currentPlayer: 'x' | 'o';
}
