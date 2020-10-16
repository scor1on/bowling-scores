import { SET_PLAYERS, ADD_SCORE, SCORE_ERROR, RESET_SCORES } from '../types';
import { IScoreState } from './ScoreContext';
import {
  updateCurrentMove,
  updateFrames,
  updatePlayer,
  updateTotalScore,
} from '../../utils/gameUtils';
import { IUserScore } from '../../models/IUserScore';

export type Action =
  | { type: typeof RESET_SCORES }
  | { type: typeof ADD_SCORE; payload: number }
  | { type: typeof SCORE_ERROR; payload: string }
  | { type: typeof SET_PLAYERS; payload: IUserScore[] | null };

export default (state: IScoreState, action: Action): IScoreState => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        players: action.payload,
        activePlayer: 0,
      };

    case ADD_SCORE:
      if (state.players === null) return state;

      const playerData = state.players[state.activePlayer];
      playerData.totalScores = updateTotalScore(playerData, action.payload);
      playerData.frames = updateFrames(playerData, action.payload);
      playerData.pins = [...playerData.pins, action.payload];
      playerData.moves = updateCurrentMove(playerData.moves, action.payload);
      playerData.lastRoll = action.payload;

      return {
        ...state,
        activePlayer: updatePlayer(
          playerData,
          state.activePlayer,
          state.players.length
        ),
      };
    case SCORE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_SCORES:
      return {
        ...state,
        activePlayer: 0,
        players: !state.players
          ? null
          : state.players.map(({ playerName }) => ({
              playerName,
              frames: [],
              moves: 0,
              pins: [],
              lastRoll: 0,
              totalScores: [],
            })),
      };

    default:
      return state;
  }
};
