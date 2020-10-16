import { createContext } from 'react';
import { IUserScore } from '../../models/IUserScore';

export interface IScoreState {
  players: IUserScore[] | null;
  activePlayer: number;
  gameOver: boolean;
  error: string | null;
}

export interface IScoreContext extends IScoreState {
  dispatch?: ({ type }: { type: string }) => void;
  addPlayers: (players: IUserScore[]) => void;
  addScore: (pin: number) => void;
  newGame: () => void;
  restartCurrentGame: () => void;
}

export const ScoreContext = createContext<IScoreContext>(null!);
