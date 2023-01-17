import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGameContext } from '../../../context/gameContext';
import Board from '../../game/Board';
import Controlls from '../../game/Controlls';
import Details from '../../game/Details';

export const GamePage: React.FC = () => {
  const { opponent } = useParams();

  const { setVs, handleComputerMove } = useGameContext();

  useEffect(() => {
    if (opponent === 'player') {
      setVs('h');
    } else {
      setVs('c');
      handleComputerMove();
    }
  }, [opponent, setVs, handleComputerMove]);

  return (
    <>
      <Board />
      <Details />
      <Controlls />
    </>
  );
};
