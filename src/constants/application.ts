import { Level } from "../hooks/use-battleship-context";

export const STORAGE_KEY = "battleship";

export const MIN_ATTEMPS = 20;

export const MAX_ATTEMPS = {
  [Level.Easy]: 'infinite',
  [Level.Mediun]: 100,
  [Level.Hard]: 50,
}