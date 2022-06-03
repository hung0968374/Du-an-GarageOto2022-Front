import React from 'react';
import { Box, Container, TextField, Avatar, IconButton, Button, Menu, MenuItem } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

type CustomDialogType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  title: string | React.ReactElement;
  content: string | React.ReactElement;
  agreeText?: string;
  disagreeText?: string;
  onDisagree?: () => void;
  onAgree: () => void;
};

const CustomDialog: React.FC<CustomDialogType> = ({
  open,
  setOpen,
  title,
  content,
  agreeText = 'AGREE',
  disagreeText = 'DISAGREE',
  onDisagree,
  onAgree,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = React.useCallback(() => {
    onAgree();
    setOpen(false);
  }, [onAgree, setOpen]);
  const handleDisagree = React.useCallback(() => {
    if (onDisagree) {
      onDisagree();
    }
    setOpen(false);
  }, [onDisagree, setOpen]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree}>{agreeText}</Button>
        <Button onClick={handleDisagree} autoFocus>
          {disagreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
