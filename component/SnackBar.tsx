import { Snackbar, Button, Alert } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react'

interface Props {
    type: 'SUCCESS'|'ERROR',
    message: string,
    openMessage: boolean,
    setOpenMessage: (args: boolean) => void 
}

export default function SnackBar({type, message, openMessage, setOpenMessage}:Props){
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenMessage(false);
      };
    const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    return(
        <Snackbar 
            sx={{
                backgroundColor: type==='SUCCESS'?'green':'red',
                color: 'white'
            }}
            open={openMessage} 
            autoHideDuration={3000} 
            action={action}
            onClose={()=>{
                setOpenMessage(false)
            }}
        >
          <Alert variant="filled" severity={type==='SUCCESS'?'success':'error'} onClose={()=>{
            setOpenMessage(false)
          }}>
            {message}
          </Alert>
          </Snackbar>
    )
}