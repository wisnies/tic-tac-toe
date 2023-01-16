import { createContext, useContext } from 'react';
import { iBoardContext } from '../libs/interfaces/BoardContext.interface';

export const BoardContext = createContext<iBoardContext>({} as iBoardContext);

type BoardContextProviderProps = {
  children: React.ReactNode;
};

export const BoardContextProvider = ({
  children,
}: BoardContextProviderProps) => {
  return (
    <BoardContext.Provider value={{ a: '1' }}>{children}</BoardContext.Provider>
  );
};

export const useBoardContext = () => useContext(BoardContext);
