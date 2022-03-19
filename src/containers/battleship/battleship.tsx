import { Alert, Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { useBattleshipContext } from '../../hooks/use-battleship-context';
import { useBoolean } from '../../hooks/use-boolean';
import { GameStartType } from '../../models/game-start';
import { drawBoard, IBattleshipBoard, IShips } from '../../utils/battleship-builder';
import styles from './battleship.module.scss';
import { EndGameDialog, EndGameResult } from './end-game-dialog';
import { MiniShips } from './mini-ships';
import { Ships } from './ships';
import { StartNewDialog } from './start-new-dialog';

interface IOwnProps {}

export const Battleship: React.FC<IOwnProps> = () => {
  const [showHints, { set: setShowHints }] = useBoolean(false);
  const [requestStart, requestStartSetter] = useBoolean(false);
  const [openEndGame, openEndGameSetter] = useBoolean(false);
  const [gameResult, setGameResult] = React.useState<EndGameResult | null>(null);

  const { setter, batteshipBoard, allowedAttemps, attemps, level, pressedCells, sinkedShips } =
    useBattleshipContext();
  const { positions, ships } = batteshipBoard || {};

  const handleCellClick = React.useCallback(
    (cell: string) => {
      const shipName = batteshipBoard?.board![cell];
      const remainingSpots = shipName
        ? batteshipBoard?.ships![shipName].spots.filter((it) => it !== cell)
        : null;

      const newSettings = {
        attemps: attemps! + 1,
        pressedCells: pressedCells!.concat({ name: cell, hit: !!shipName }),
        ...(remainingSpots !== null &&
          remainingSpots.length === 0 && { sinkedShips: sinkedShips!.concat(shipName!) }),
        batteshipBoard: {
          ...batteshipBoard,
          ...(shipName && {
            ships: {
              ...batteshipBoard?.ships,
              [shipName!]: {
                ...batteshipBoard?.ships[shipName!],
                ...(remainingSpots !== null && { spots: remainingSpots }),
              },
            } as IShips,
          }),
        } as IBattleshipBoard,
      };
      setter(newSettings);

      const gameEnded =
        newSettings.sinkedShips?.length === Object.keys(newSettings.batteshipBoard.ships).length;
      setTimeout(() => {
        if (allowedAttemps === newSettings.attemps || gameEnded) {
          openEndGameSetter.on();
          setGameResult(gameEnded ? 'win' : 'over');
        }
      }, 200);
    },
    [
      batteshipBoard,
      attemps,
      allowedAttemps,
      pressedCells,
      sinkedShips,
      setter,
      openEndGameSetter,
      setGameResult,
    ]
  );

  const handleStartGame = React.useCallback(
    (action: 'requested' | 'automatic', data?: GameStartType) => {
      if (action === 'requested') {
        requestStartSetter.off();
      } else {
        openEndGameSetter.off();
      }

      const newBoard = drawBoard();
      setter({
        batteshipBoard: newBoard,
        pressedCells: [],
        sinkedShips: [],
        attemps: 0,
        ...(data && { allowedAttemps: data.attemps }),
      });
    },
    [setter, requestStartSetter, openEndGameSetter]
  );

  const remainingAttemps = React.useMemo(() => {
    if (allowedAttemps === 'infinite') return 0;

    return (allowedAttemps as number) - attemps!;
  }, [allowedAttemps, attemps]);

  return (
    <div className={styles.root}>
      {positions && (
        <Alert classes={{ message: styles.alert }} severity="info">
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography>
              Level:{' '}
              <Typography color="primary" component="span" sx={{ fontWeight: 'bold' }}>
                {level}
              </Typography>
            </Typography>
            <Typography>
              Remaining attemps:{' '}
              <Typography color="primary" component="span" sx={{ fontWeight: 'bold' }}>
                {remainingAttemps}
              </Typography>
            </Typography>
          </Box>
        </Alert>
      )}
      <div className={styles.container}>
        <Ships
          displayHints={showHints}
          onCellClick={handleCellClick}
          positions={positions! || []}
          pressedCells={pressedCells}
          ships={ships! || {}}
          sinkedShips={sinkedShips}
        />
        <div className={styles.miniShips}>
          {ships && <MiniShips ships={ships!} sinkedShips={sinkedShips} />}
        </div>
      </div>
      <div className={styles.actions}>
        <Button onClick={requestStartSetter.on} variant="text">
          Start New Game
        </Button>
        {positions && (
          <ToggleButtonGroup
            color="primary"
            onChange={(_, value) => setShowHints(value)}
            size="small"
            value={showHints}
            exclusive
          >
            <ToggleButton value={true}>{showHints ? 'Hide ' : 'Show '} Hints</ToggleButton>
          </ToggleButtonGroup>
        )}
      </div>

      {requestStart && (
        <StartNewDialog
          gameAttemps={Number.isInteger(allowedAttemps) ? (allowedAttemps as number) : 0}
          level={level}
          onOk={(data) => handleStartGame('requested', data)}
          open={requestStart}
        />
      )}
      <EndGameDialog
        attemps={attemps!}
        onClose={openEndGameSetter.off}
        onOk={() => handleStartGame('automatic')}
        open={!!gameResult && openEndGame}
        type={gameResult!}
      />
    </div>
  );
};
