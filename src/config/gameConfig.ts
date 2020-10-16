interface IGameConfig {
  useSessionStorage: boolean;
  playersKey: string;
  strikeBonus: number;
  spareBonus: number;
  maxPlayers: number;
}

export const GameConfig: IGameConfig = {
  useSessionStorage: true,
  playersKey: 'players',
  strikeBonus: 10,
  spareBonus: 10,
  maxPlayers: 10,
};
