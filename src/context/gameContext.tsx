import { createContext, useCallback, useContext, useState } from 'react';
import { iGameContext } from '../libs/interfaces/GameContext.interface';

export const GameContext = createContext<iGameContext>({} as iGameContext);

type GameContextProviderProps = {
  children: React.ReactNode;
};

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Symbols = 'x' | 'o' | null;

type PlayerSymbol = 'x' | 'o';
type VsSymbol = 'c' | 'h';

const defaultBoard = (): null[] => new Array(9).fill(null);

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [board, setBoard] = useState<Symbols[]>(defaultBoard());
  const [p1, setP1] = useState<PlayerSymbol>('x');
  const [p2, setP2] = useState<PlayerSymbol>('o');
  const [vs, setVs] = useState<VsSymbol>('h');
  const [winner, setWinner] = useState<'x' | 'o' | 'd' | null>(null);

  const [beginningPlayer, setBeginningPlayer] = useState<PlayerSymbol>('x');
  const [currentPlayer, setCurrentPlayer] = useState<PlayerSymbol>('x');

  const [gameCanStart, setGameCanStart] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // UTILS
  const getEmptySquares = () => {
    return board
      .map((s, i) => (s === null ? i : null))
      .filter((i) => i !== null);
  };
  const isPlayerTurn = (p: PlayerSymbol) => {
    if (beginningPlayer === p) {
      return board.filter((s) => s !== null).length % 2 === 0;
    } else {
      return board.filter((s) => s !== null).length % 2 === 1;
    }
  };
  const handleMove = (p: PlayerSymbol, i: number) => {
    const newBoard = board;
    newBoard[i] = p;
    setBoard(newBoard);
  };
  const checkWinCondition = (
    p: [PlayerSymbol, PlayerSymbol, PlayerSymbol]
  ): number[][] => {
    return winConditions.filter((c) => {
      const boardState = c.map((i) => board[i]);
      const testedCondition = JSON.stringify(p.sort());
      const winningCondition = JSON.stringify(boardState.sort());
      return winningCondition === testedCondition;
    });
  };
  const displayWinner = () => {
    if (winner === 'd') {
      return 'Game ended with a draw';
    }
    if (p1 === winner) {
      return 'PlayerOne has won the game';
    }
    if (p2 === winner) {
      return 'PlayerTwo has won the game';
    }

    return 'Game is On';
  };
  const setPlayers = (symbol: PlayerSymbol) => {
    if (symbol === 'x') {
      setP1('x');
      setP2('o');
    } else {
      setP1('o');
      setP2('x');
    }
    setGameCanStart(true);
  };

  // GAME
  const checkForWinner = () => {
    const p1Won = checkWinCondition([p1, p1, p1]).length > 0;
    const p2Won = checkWinCondition([p2, p2, p2]).length > 0;

    const emptySquares = getEmptySquares();

    if (emptySquares.length === 0 && !p1Won && !p2Won) {
      setWinner('d');
      setGameEnded(true);
    }

    if (p1Won) {
      setWinner(p1);
      setGameEnded(true);
    }
    if (p2Won) {
      setWinner(p2);
      setGameEnded(true);
    }
  };
  const handleSquareClick = (i: number) => {
    checkForWinner();
    const emptySquares = getEmptySquares();

    const isP1Turn = isPlayerTurn(p1);
    const isP2Turn = isPlayerTurn(p2);

    if (isP1Turn && gameCanStart && !gameEnded) {
      if (emptySquares.includes(i)) {
        handleMove(p1, i);
        setCurrentPlayer(p2);
        checkForWinner();
      }
    }
    if (isP2Turn && gameCanStart && !gameEnded) {
      if (emptySquares.includes(i)) {
        handleMove(p2, i);
        setCurrentPlayer(p1);
        checkForWinner();
      }
    }
  };
  const restartGame = () => {
    setBoard(defaultBoard());
    setGameEnded(false);
    setWinner(null);
    if (beginningPlayer === 'x') {
      setCurrentPlayer('o');
      setBeginningPlayer('o');
    } else {
      setCurrentPlayer('x');
      setBeginningPlayer('x');
    }
  };
  const resetGame = useCallback(() => {
    setBoard(defaultBoard());
    setGameEnded(false);
    setGameCanStart(false);
    setWinner(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        board,
        handleSquareClick,
        gameCanStart,
        gameEnded,
        winner,
        restartGame,
        resetGame,
        beginningPlayer,
        currentPlayer,
        vs,
        setVs,
        p1,
        p2,
        setPlayers,
        displayWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
