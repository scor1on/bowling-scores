import { SET_PLAYERS, ADD_SCORE, SCORE_ERROR, RESET_SCORES } from '../types';
import { IScoreState } from './ScoreContext';
import {
  isGameOver,
  updateCurrentMove,
  updateFrames,
  updatePlayer,
  updateTotalScore,
} from '../../utils/gameUtils';
import { IUserScore } from '../../models/IUserScore';
import { initialPlayerState, initialState } from './ScoreState';

export type Action =
  | { type: typeof RESET_SCORES }
  | { type: typeof ADD_SCORE; payload: number }
  | { type: typeof SCORE_ERROR; payload: string }
  | { type: typeof SET_PLAYERS; payload: IUserScore[] | null };

export default (state: IScoreState, action: Action): IScoreState => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...initialState,
        ...state,
        players: action.payload,
        gameOver: false,
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
        gameOver: isGameOver(state.players),
      };
    case SCORE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_SCORES:
      return {
        ...state,
        ...initialState,
        gameOver: false,
        players: !state.players
          ? null
          : state.players.map(({ playerName }) => ({
              ...initialPlayerState,
              playerName,
            })),
      };

    default:
      return state;
  }
};
