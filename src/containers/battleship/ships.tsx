import React from 'react';
import { IShips } from '../../utils/battleship-builder';
import styles from './ships.module.scss';
import classNames from 'classnames';
import { IPressedCell } from '../../hooks/use-battleship-context';

interface IOwnProps {
  ships: IShips;
  onCellClick: (cell: string) => void;
  positions: string[][];
  sinkedShips?: string[];
  pressedCells?: IPressedCell[];
  displayHints?: boolean;
}

interface ICellsWithX {
  [key: string]: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}
export const Ships: React.FC<IOwnProps> = ({
  positions,
  ships,
  onCellClick,
  displayHints,
  sinkedShips = [],
  pressedCells = [],
}) => {
  const cellsWithX = React.useMemo(() => {
    const items = displayHints ? Object.keys(ships) : sinkedShips;

    return items.reduce((acc, key) => {
      const { cells, direction } = ships[key];
      return cells.reduce((iacc, cell, index) => {
        iacc[cell] = {
          top: direction === 'horizontal' || index === 0,
          bottom: direction === 'horizontal' || index === cells.length - 1,
          left: direction === 'vertical' || index === 0,
          right: direction === 'vertical' || index === cells.length - 1,
        };

        return iacc;
      }, acc as ICellsWithX);
    }, {} as ICellsWithX);
  }, [ships, sinkedShips, displayHints]);

  const drawColumn = React.useCallback(
    (columns: string[]) => {
      return (
        <>
          {columns.map((cell) => {
            const [column, row] = cell.split(':');
            const pressed = pressedCells?.find((it) => it.name === cell);
            const cellX = cellsWithX[cell];

            return (
              <div
                key={cell}
                className={classNames(styles.spot, {
                  [styles.pressedSpot]: pressed && !displayHints,
                  [styles.xSpot]: cellX,
                  [styles.hint]: displayHints,
                })}
                data-testid={cell}
                onClick={() => !pressed && !displayHints && onCellClick(cell)}
              >
                {row === '1' && (
                  <span className={classNames(styles.marker, styles.columnMarker)}>{column}</span>
                )}
                {column === 'A' && (
                  <span className={classNames(styles.marker, styles.rowMarker)}>{row}</span>
                )}
                {!displayHints && pressed && <span className={styles.pressed} />}
                {!displayHints && (cellX || pressed?.hit) && <span className={styles.x} />}
                {cellX?.top && (
                  <span className={classNames(styles.top, { [styles.hint]: displayHints })} />
                )}
                {cellX?.bottom && (
                  <span className={classNames(styles.bottom, { [styles.hint]: displayHints })} />
                )}
                {cellX?.left && (
                  <span className={classNames(styles.left, { [styles.hint]: displayHints })} />
                )}
                {cellX?.right && (
                  <span className={classNames(styles.right, { [styles.hint]: displayHints })} />
                )}
              </div>
            );
          })}
        </>
      );
    },
    [onCellClick, cellsWithX, pressedCells, displayHints]
  );

  return (
    <div className={styles.board}>
      {positions.map((position) => {
        const column = position[0].split(':')[0];
        return (
          <div key={column} className={styles.column} data-testid={column}>
            {drawColumn(position)}
          </div>
        );
      })}
    </div>
  );
};
