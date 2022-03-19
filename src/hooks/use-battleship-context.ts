import React from 'react';
import { IBattleshipBoard } from '../utils/battleship-builder';

export enum Level {
  Easy = 'Easy',
  Mediun = 'Mediun',
  Hard = 'Hard',
}

export interface IPressedCell {
  name: string;
  hit: boolean;
}

export interface IBattleshipContext {
  batteshipBoard?: IBattleshipBoard | null;
  level: Level;
  allowedAttemps?: number | 'infinite';
  attemps?: number;
  sinkedShips: string[];
  pressedCells: IPressedCell[];
  history?: [];
  setter: (settings: Partial<IBattleshipContext>) => void;
}

export const DEFAULT_SETTINGS: IBattleshipContext = {
  level: Level.Easy,
  allowedAttemps: 'infinite',
  attemps: 0,
  sinkedShips: [],
  pressedCells: [],
  setter: () => {},
};

export const BattleshipContext = React.createContext<IBattleshipContext>(DEFAULT_SETTINGS);

export const useBattleshipContext = () => React.useContext<IBattleshipContext>(BattleshipContext);
