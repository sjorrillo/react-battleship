import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import Button from '@mui/material/Button';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { GameStartSchema, GameStartType } from '../../models/game-start';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { Level } from '../../hooks/use-battleship-context';

interface IOwnProps {
  open: boolean;
  onOk: (data: GameStartType) => void;
  level: Level;
  gameAttemps: number;
}

export const StartNewDialog: React.FC<IOwnProps> = ({ open, level, gameAttemps, onOk }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const methods = useForm<GameStartType>({
    resolver: yupResolver(GameStartSchema),
    defaultValues: {
      level: level,
      attemps: gameAttemps,
    },
  });
  const { handleSubmit: submitWrapper, formState: { errors } } = methods;

  return (<Dialog open={open} fullScreen={fullScreen}>
       <DialogTitle id="responsive-dialog-title">
          {"Start New Game"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insert the number of attemps:
          </DialogContentText>
          <FormProvider {...methods}>
            <Box component="form" noValidate>
              <Controller
                name="attemps"
                render={({ field: { onChange, value }}) => {
                  return (
                    <TextField label="Attemps" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} value={value} error={!!errors.attemps?.message} helperText={errors.attemps?.message} onChange={({ target }) => onChange(target.value)} />
                  )
                }}
              />
            </Box>
            </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitWrapper(onOk)} type="submit" autoFocus>
            Ok
          </Button>
        </DialogActions>
  </Dialog>);
};
