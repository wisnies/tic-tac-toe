import { createContext, useContext } from 'react';
import { iGameContext } from '../libs/interfaces/GameContext.interface';

export const GameContext = createContext<iGameContext>({} as iGameContext);

type GameContextProviderProps = {
  children: React.ReactNode;
};

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  return (
    <GameContext.Provider value={{ a: '1' }}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
