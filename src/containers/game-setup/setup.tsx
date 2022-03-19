import { Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { MAX_ATTEMPS } from '../../constants/application';
import { Level, useBattleshipContext } from '../../hooks/use-battleship-context';

interface IOwnProps {
  className?: string;
}

const GameSetup: React.FC<IOwnProps> = () => {
  const { setter, level } = useBattleshipContext();
  const handleChange = React.useCallback((_, value: string | Level) => {
    setter({ batteshipBoard: null, attemps: 0, sinkedShips: [], pressedCells: [], level: value as Level, allowedAttemps: MAX_ATTEMPS[value as Level] as any });
  }, [setter]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '80%', marginTop: '20px' }}>
        <CardContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Game Levek</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={level}
              onChange={handleChange}
              row
            >
              <FormControlLabel value={Level.Easy} control={<Radio />} label={Level.Easy} />
              <FormControlLabel value={Level.Mediun} control={<Radio />} label={Level.Mediun} />
              <FormControlLabel value={Level.Hard} control={<Radio />} label={Level.Hard} />
            </RadioGroup>
          </FormControl>
          </CardContent>
      </Card>
    </Box>
  );
};

export default GameSetup;
