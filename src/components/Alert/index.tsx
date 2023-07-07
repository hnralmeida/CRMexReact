import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';

interface Props {
    handleClick: (id?: string) => void;
    handleClose: () => void;
    msg?: string;
    id?: string;
}

export default function Alert({ handleClick, handleClose, msg, id }: Props) {

    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
        id? handleClick(id) : handleClick();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {msg? msg: "Tem certeza que deseja excluir?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Clique em aceitar para confirmar,
                    ou cancelar para voltar.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClickOpen} autoFocus>
                    Aceitar
                </Button>
            </DialogActions>
        </Dialog>
    )
}