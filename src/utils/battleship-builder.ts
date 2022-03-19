const BOARD_SIZE = 10;
const MAX_ROW = BOARD_SIZE;
const MAX_COLUMN = 65 + BOARD_SIZE - 1;

interface IBoard {
  [key: string]: string | null;
}

interface IBoardPositions {
  board: IBoard;
  positions: string[][];
}

interface IShipSpot {
  direction: Direction;
  readonly cells: string [];
  spots: string[];
}

export interface IShips {
  [key: string]: IShipSpot;
}

export interface IBattleshipBoard {
  board: IBoard;
  ships: IShips;
  positions: string[][];
}

export type Direction = "horizontal" | "vertical";

const buildKey = (column: string, row: number): string => `${column}:${row}`;

const buildBoard = (): IBoardPositions => {
  const columns = Array.from(Array(BOARD_SIZE), (_, index) =>
    String.fromCharCode(65 + index)
  );
  const rows = Array.from(Array(BOARD_SIZE), (_, index) => 1 + index);

  return columns.reduce((acc, column, index) => {
    acc.positions[index] = [];
    return rows.reduce((iacc, row) => {
      const spotName = buildKey(column, row);
      iacc.board[spotName] = null;
      iacc.positions[index].push(spotName);
      return iacc;
    }, acc);
  }, { board: {}, positions: [] } as IBoardPositions);
};

const getStartingPoint = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const getShipBoardSpots = (
  size: number,
  row: number,
  column: number,
  direction: "horizontal" | "vertical"
): string[] => {
  if (direction === "horizontal") {
    return Array.from(Array(size), (_, index) =>
      buildKey(String.fromCharCode(column + index), row)
    );
  }

  return Array.from(Array(size), (_, index) =>
    buildKey(String.fromCharCode(column), row + index)
  );
};

const drawShipBoard = (board: IBoard, size: number): { positions: string[], direction: Direction } => {
  const row = getStartingPoint(1, MAX_ROW + 1);
  const column = getStartingPoint(65, MAX_COLUMN + 1);

  let positions: string[] = [];
  let direction: Direction = "horizontal";
  if (column + size <= MAX_COLUMN) {
    positions = getShipBoardSpots(size, row, column, direction);
  } else if (row + size <= MAX_ROW) {
    direction = "vertical";
    positions = getShipBoardSpots(size, row, column, direction);
  }

  if (!positions.length || positions.some((key) => board[key] !== null)) {
    return drawShipBoard(board, size);
  }

  return {
    direction,
    positions,
  };
};

export const drawBoard = (): IBattleshipBoard => {
  const { board, positions } = buildBoard();
  // ● 1 que tiene 4 espacios de largo.
  // ● 2 que son 3 espacios de largo.
  // ● 3 que son 2 espacios de largo.
  // ● 4 que son 1 espacio de largo
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].reduce((acc, size, index) => {
    const { direction, positions } = drawShipBoard(board, size);
    const shipName = `${size}_${index}`;
    positions.forEach(position =>  {
      board[position] = shipName;
    });
    acc[shipName] = {
      direction,
      cells: [...positions],
      spots: [...positions],
    };
    return acc;
  }, {} as IShips);

  return { board, ships, positions };
};
