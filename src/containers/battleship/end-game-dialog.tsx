/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText/DialogContentText';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export type EndGameResult = 'win' | 'over';

interface IOwnProps {
  open: boolean;
  type: EndGameResult;
  attemps: number;
  onOk: () => void;
  onClose: () => void;
}

export const EndGameDialog: React.FC<IOwnProps> = ({ open, type, onOk, onClose, attemps }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const bodyContent = React.useMemo(() => {
    if (type === 'win') {
      return (
        <Typography>
          Congrats you win the game in{' '}
          <Typography color="primary" component="span" sx={{ fontWeight: 'bold' }}>
            {attemps}
          </Typography>{' '}
          attemps. Do you want to try again?
        </Typography>
      );
    }

    return <Typography>You left without attempts. Do you want to try again?</Typography>;
  }, [type, attemps]);

  return (
    <Dialog fullScreen={fullScreen} open={open}>
      <DialogTitle id="responsive-dialog-title">
        {type === 'win' ? 'You win' : 'Game Over'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div">{bodyContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          No
        </Button>
        <Button onClick={onOk} autoFocus>
          let's try
        </Button>
      </DialogActions>
    </Dialog>
  );
};
