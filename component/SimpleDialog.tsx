import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
export interface SimpleDialogProps {
    open: boolean;
    title: string;
    content: ()=>JSX.Element;
    handleClose: () => void
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  

export default function SimpleDialog(props: SimpleDialogProps) {
    const { open, title, content, handleClose } = props;
          
    return (
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{
                    maxWidth: '550px',
                    minWidth: '500px',
                }}>
            {content()}
        </DialogContent>
      </BootstrapDialog>
    );
  }