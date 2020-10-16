import React, { useContext } from 'react';
import { ScoreContext } from '../../contexts/score';
import { ScoreCard } from './ScoreCard';

export const ScoreCards: React.FC = () => {
  const { players, activePlayer } = useContext(ScoreContext);

  return (
    <>
      {players &&
        players.map((player, key) => (
          <ScoreCard
            key={key}
            player={player}
            isActive={activePlayer === key}
          />
        ))}
    </>
  );
};
