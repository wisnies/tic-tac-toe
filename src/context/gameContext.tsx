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
  const checkWinCondition = (p: [Symbols, Symbols, Symbols]): number[][] => {
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
    if (isP2Turn && gameCanStart && !gameEnded && vs === 'h') {
      if (emptySquares.includes(i)) {
        handleMove(p2, i);
        setCurrentPlayer(p1);
        checkForWinner();
      }
    }
  };

  const randomArrElement = (arr: any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  const handleComputerMove = () => {
    const isP2Turn = isPlayerTurn(p2);
    const emptySquares = getEmptySquares();
    if (isP2Turn && gameCanStart && !gameEnded) {
      let computerMove = emptySquares[
        Math.floor(Math.random() * emptySquares.length)
      ] as number;

      const bc1 = checkWinCondition([p1, null, null]);
      if (bc1.length > 0) {
        const bcArr = randomArrElement(bc1).filter(
          (i: number) => board[i] === null
        );
        computerMove = randomArrElement(bcArr);
        if (bc1.length === 3 && emptySquares.length === 8) {
          computerMove = 4;
        }
      }
      const pc1 = checkWinCondition([p2, null, null]);
      if (pc1.length > 0) {
        const pmArr = randomArrElement(pc1).filter(
          (i: number) => board[i] === null
        );
        computerMove = randomArrElement(pmArr);
        if (emptySquares.length === 6) {
          let newPmArr = pc1.filter((line) => !line.includes(0));
          newPmArr = pc1.filter((line) => !line.includes(2));
          newPmArr = pc1.filter((line) => !line.includes(6));
          newPmArr = pc1.filter((line) => !line.includes(8));
          const newPmArr1 = randomArrElement(newPmArr).filter(
            (i: number) => board[i] === null
          );
          computerMove = randomArrElement(newPmArr1);
        }
      }

      const pc2 = checkWinCondition([p2, p2, null]);
      if (pc2.length > 0) {
        const pmArr = randomArrElement(pc2).filter(
          (i: number) => board[i] === null
        );
        computerMove = randomArrElement(pmArr);
      }
      const bc2 = checkWinCondition([p1, p1, null]);
      if (bc2.length > 0) {
        const bcArr = randomArrElement(bc2).filter(
          (i: number) => board[i] === null
        );
        computerMove = randomArrElement(bcArr);
      }

      if (emptySquares.includes(computerMove)) {
        handleMove(p2, computerMove);
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
        handleComputerMove,
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
