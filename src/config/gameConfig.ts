interface IGameConfig {
  useSessionStorage: boolean;
  playersKey: string;
  bonusMove: number;
  strike: number;
  strikeBonus: number;
  spareBonus: number;
}

export const GameConfig: IGameConfig = {
  useSessionStorage: true,
  playersKey: 'players',
  bonusMove: 20,
  strike: 10,
  strikeBonus: 10,
  spareBonus: 10,
};
