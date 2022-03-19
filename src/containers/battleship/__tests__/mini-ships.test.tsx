import { MiniShips } from '../mini-ships';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IShips } from '../../../utils/battleship-builder';

describe('battlesip/mini-ships', () => {
  describe('when the component', () => {
    it('should render', () => {
      const ships: IShips = {
        '4_1': {
          direction: 'horizontal',
          cells: ['A:1', 'B:1', 'C:1', 'D:1'],
          spots: ['A:1', 'B:1', 'C:1', 'D:1'],
        },
        '2_2': {
          direction: 'horizontal',
          cells: ['C:7', 'D:8'],
          spots: ['C:7', 'D:8'],
        },
        '1_3': {
          direction: 'vertical',
          cells: ['C:5'],
          spots: ['C:5'],
        },
        '1_4': {
          direction: 'vertical',
          cells: ['J:5'],
          spots: ['J:5'],
        },
      };

      const sinkedShips = ['1_3', '2_2'];

      render(<MiniShips ships={ships} sinkedShips={sinkedShips} />);

      expect(screen.getByTestId('4').children).toHaveLength(1);
      expect(screen.getByTestId('2').children).toHaveLength(1);
      expect(screen.getByTestId('1').children).toHaveLength(2);

      expect(screen.getByTestId('A:1')).not.toHaveClass('sinked');
      expect(screen.getByTestId('A:1')).toHaveClass('spot');

      expect(screen.getByTestId(ships[sinkedShips[0]].spots[0])).toHaveClass('sinked');
      expect(screen.getByTestId(ships[sinkedShips[0]].spots[0])).toHaveClass('spot');
      expect(screen.getByTestId(ships[sinkedShips[1]].spots[0])).toHaveClass('sinked');
      expect(screen.getByTestId(ships[sinkedShips[1]].spots[0])).toHaveClass('spot');
      expect(screen.getByTestId(ships[sinkedShips[1]].spots[1])).toHaveClass('sinked');
      expect(screen.getByTestId(ships[sinkedShips[1]].spots[1])).toHaveClass('spot');
    });
  });
});
