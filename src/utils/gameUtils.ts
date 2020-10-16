import { GameConfig } from '../config/gameConfig';
import { IUserScore } from '../models/IUserScore';

export const updatePlayer = (
  playerData: IUserScore,
  activePlayerIndex: number,
  playersCount: number
) => {
  if (
    playerData.moves > 19 &&
    playerData.frames.length === playerData.totalScores.length
  ) {
    // Check of last Frame
    return activePlayerIndex >= playersCount - 1 ? 0 : ++activePlayerIndex;
  } else if (isFrameOpen(playerData.moves) && !isBonusMove(playerData.moves)) {
    return activePlayerIndex >= playersCount - 1 ? 0 : ++activePlayerIndex;
  } else {
    return activePlayerIndex;
  }
};

export const updateFrames = (
  { moves, frames }: IUserScore,
  lastScore: number
): number[][] => {
  if (isFrameOpen(moves) && !isBonusMove(moves)) {
    return [...frames, [lastScore]];
  } else {
    const frame = getLastFrame(frames);
    return [...frames.slice(0, -1), [...frame, lastScore]];
  }
};

export const updateTotalScore = (
  { moves, frames, totalScores, pins }: IUserScore,
  lastScore: number
): number[] => {
  const currentScore = getCurrentScore(totalScores);

  if (skipPrevBonusMove(moves, pins, lastScore)) {
    return totalScores;
  }

  if (isBonusMove(moves)) {
    const frameScore = getFrameScore(moves, frames, lastScore);
    return [...totalScores, currentScore + frameScore];
  }

  if (
    isFrameClose(moves) &&
    !isStrike(lastScore) &&
    !isSpare(prevVal(pins), lastScore)
  ) {
    const frameScore = getFrameScore(moves, frames, lastScore);

    // If Previous Frame was Strike
    if (isStrike(prevVal(pins, 2)) && moves > 2) {
      const bonus = strikeBonus(prevVal(pins), lastScore);
      const previousFrameScore = bonus + currentScore;
      return isStrike(prevVal(pins)) && moves === 19
        ? [...totalScores, previousFrameScore]
        : [...totalScores, previousFrameScore, frameScore + previousFrameScore];
    }

    return [...totalScores, currentScore + frameScore];
  }

  // Spare Case
  if (isFrameOpen(moves) && isSpare(prevVal(pins, 2), prevVal(pins))) {
    const spare = spareBonus(lastScore);
    return [...totalScores, currentScore + spare];
  }

  // Strike Case - Strike is First Ball 10 Pins, if first is zero and second is 10 it is a spare
  if (isStrike(prevVal(pins, 2)) && prevVal(pins, 3) !== 0 && moves > 2) {
    const bonus = strikeBonus(prevVal(pins), lastScore);
    return [...totalScores, currentScore + bonus];
  }

  return totalScores;
};

export const updateCurrentMove = (moves: number, lastScore: number): number => {
  if (isStrike(lastScore) && isFrameOpen(moves) && moves < 18) {
    return moves + 2;
  } else {
    return moves + 1;
  }
};

/* Skipping in cases: 
  1) It's Strike and Frame 9 not strike
  or
  2) It's not Strike, not Spare, Previous roll was Strike and Frame 9 wasn't strike
*/
export const skipPrevBonusMove = (
  moves: number,
  pins: number[],
  lastScore: number
) => {
  return (
    moves === 19 &&
    ((isStrike(lastScore) && !isStrike(prevVal(pins, 2))) ||
      (!isStrike(lastScore) &&
        !isSpare(prevVal(pins), lastScore) &&
        isStrike(prevVal(pins)) &&
        !isStrike(prevVal(pins, 2))))
  );
};

export const isGameOver = (
  moves: number,
  lastScore: number,
  pins: number[]
): boolean => {
  const GameNotOver =
    moves < 19 ||
    (moves === 19 &&
      (isSpare(lastScore, prevVal(pins)) || isStrike(prevVal(pins))));
  return !GameNotOver;
};

const getFrameScore = (
  moves: number,
  frames: number[][],
  lastScore: number
) => {
  const lastFrame = getLastFrame(frames);
  return isBonusMove(moves)
    ? prevVal(lastFrame) + prevVal(lastFrame, 2) + lastScore
    : prevVal(lastFrame) + lastScore;
};

const lastIndex = (frames: number[][]): number => frames.length - 1;
const getLastFrame = (frames: number[][]): number[] =>
  frames[lastIndex(frames)];

const isFrameClose = (moves: number): boolean => moves % 2 !== 0;
const isFrameOpen = (moves: number): boolean => moves % 2 === 0;
const isBonusMove = (moves: number): boolean => moves === GameConfig.bonusMove;
const isStrike = (pins: number): boolean => pins === GameConfig.strike;
const isSpare = (move1: number, move2: number): boolean => move1 + move2 === 10;
const strikeBonus = (move1: number, move2: number): number =>
  GameConfig.strikeBonus + move1 + move2;
const spareBonus = (move1: number): number => GameConfig.spareBonus + move1;

const getCurrentScore = (totalScores: number[]) => {
  return totalScores.slice(-1)[0] || 0;
};

const prevVal = (arr: number[], key: number = 1): number => arr.slice(-key)[0];
