import React, { useReducer } from 'react';
import { ADD_SCORE, RESET_SCORES, SET_PLAYERS } from '../types';
import { IScoreState } from './ScoreContext';
import ScoreReducer, { Action } from './ScoreReducer';
import { ScoreContext } from './ScoreContext';
import { GameConfig } from '../../config/gameConfig';
import { IUserScore } from '../../models/IUserScore';

export const ScoreState: React.FC = (props) => {
  const initialState: IScoreState = {
    players: null,
    activePlayer: 0,
    error: null,
  };

  if (GameConfig.useSessionStorage) {
    const playersInStorage = sessionStorage.getItem(GameConfig.playersKey);

    if (playersInStorage) {
      initialState.players = JSON.parse(playersInStorage);
    }
  }

  const [state, dispatch] = useReducer<React.Reducer<IScoreState, Action>>(
    ScoreReducer,
    initialState
  );

  const addPlayers = (players: IUserScore[]) => {
    dispatch({ type: SET_PLAYERS, payload: players });

    if (GameConfig.useSessionStorage) {
      sessionStorage.setItem(GameConfig.playersKey, JSON.stringify(players));
    }
  };

  const addScore = (pin: number) => {
    dispatch({ type: ADD_SCORE, payload: pin });
  };

  const newGame = () => {
    dispatch({ type: SET_PLAYERS, payload: null });
  };

  const restartCurrentGame = () => {
    dispatch({ type: RESET_SCORES });
  };

  return (
    <ScoreContext.Provider
      value={{
        ...state,
        addPlayers,
        addScore,
        newGame,
        restartCurrentGame,
      }}>
      {props.children}
    </ScoreContext.Provider>
  );
};
