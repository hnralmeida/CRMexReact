import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';

interface Props {
    handleClick: (auth: string) => Promise<any>;
    handleClose: () => void;
    msg?: string;
}

export default function UserConfirm({ handleClick, handleClose, msg }: Props) {

    const [open, setOpen] = React.useState(true);
    const [auth, setAuth] = React.useState("");
    const [load, setLoad] = React.useState(false);

    const handleClickOpen = () => {
        setLoad(true);
        handleClick(auth).then(() => {
            setOpen(!open);
            setLoad(false);
        });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {msg ? msg : "Digite sua senha para confirmar"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Digite sua senha ou clique em
                    cancelar para voltar.
                </DialogContentText>
                <div
                    style={{ display:"flex", justifyContent:"center", margin:20 }}
                >
                    <input
                        placeholder="Senha"
                        type="password"
                        onChange={(e) => setAuth(e.target.value)}
                    >
                    </input>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    onClick={handleClickOpen}
                    disabled={load}
                    autoFocus
                >
                    Aceitar
                </Button>
            </DialogActions>
        </Dialog>
    )
}