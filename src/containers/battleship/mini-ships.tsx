import React from 'react';
import { IShips } from '../../utils/battleship-builder';
import styles from './mini-ships.module.scss';
import classNames from 'classnames';

interface IOwnProps {
  ships: IShips;
  sinkedShips?: string[];
  className?: string;
}

export const MiniShips: React.FC<IOwnProps> = ({ className, ships, sinkedShips = [] }) => {
  const battleships = React.useMemo(() => {
    const items = Object.keys(ships).reduce((acc, key) => {
      const size = +key.split('_')[0];
      let values: IShips[] = [{ [key]: ships[key] }];
      if (acc.has(size)) {
        values = acc.get(size)!.concat(values);
      }
      acc.set(size, values);
      return acc;
    }, new Map<number, IShips[]>());

    return Array.from(items).sort((a, b) => b[0] - a[0]);
  }, [ships]);

  return (
    <div className={className}>
      {battleships?.map((row) => (
        <div key={row[0]} className={styles.container} data-testid={row[0]}>
          {row[1].map((node) => {
            const key = Object.keys(node)[0];
            const isSinked = sinkedShips?.some((it) => it === key);
            return (
              <div key={key} className={styles.ship} data-testid={key}>
                {node[key].cells.map((item) => (
                  <span
                    key={item}
                    className={classNames(styles.spot, { [styles.sinked]: isSinked })}
                    data-testid={item}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
