// services
import api from "../../services/api";
import { useState, useEffect, useCallback } from 'react';
import React from "react";

// types e contextos 
import { useNavigate, Navigate, Link } from 'react-router-dom';

// estilização
import AddIcon from '@mui/icons-material/Add';
import { colorTokens } from '../../colors'
import Header from "../../components/Header";
import { Box, Typography, Button, IconButton } from '@mui/material';
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../../components/Alert';
import { mockLojas } from "../../services/mocks";

export function Pagina_2() {

    const [data, setData] = useState<any>([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const colors = colorTokens();

    const handleClick = useCallback(
        (params: GridCellParams) => () => {
            console.log("ID:", params.id);
            setIdDelete(String(params.id));
        }, []
    )

    useEffect(() => {
        idDelete ? setOpen(!open) : null;
    }, [idDelete]);

    const handleClose = () => {
        console.log("Close");
        setOpen(false);
        setIdDelete("");
    };

    const handleDelete = ((id?: string) => {
        const getDelete = 'cliente/delete/' + id;
        console.log(getDelete);
        api.put(getDelete).then(({ data }) => {
            console.log(data);
            console.log("then", data.request);
            handleClose();
            setRefreshing(true);
        }).catch((error) => {
            alert("Erro: " + error);
        });

    });

    const editClient = useCallback(
        (params: GridCellParams) => () => {
            navigate('/clientes/editar/' + params.id);
        }, []
    );

    useEffect(() => {
        setData(mockLojas);
        setRefreshing(false);
    }, [refreshing, Navigate]);

    const columns = [
        {
            field: "codigo_loja",
            headerName: "Código",
            flex: 1,
        },
        {
            field: "nome_loja",
            headerName: "Nome Fantasia",
            flex: 2,
        },
        {
            field: "endereco",
            headerName: "Endereço",
            flex: 2,
        },
        {
            field: "cidade",
            headerName: "Cidade",
            flex: 1,
        },
        {
            field: "estado",
            headerName: "Estado",
            flex: 1,
        },
        {
            field: "cep",
            headerName: "CEP",
            flex: 1,
        },
        {
            field: "buttons",
            headerName: "Ações",
            flex: 1,
            renderCell: (params: GridCellParams<any, any, any>) => {

                return (
                    <Box m="0px">

                        <IconButton
                            type="button"
                            onClick={editClient(params)}
                        >
                            <ViewIcon />
                        </IconButton>

                        <IconButton
                            type="button"
                            onClick={editClient(params)}
                        >
                            <EditIcon />
                        </IconButton>

                        <IconButton
                            type="button"
                            onClick={handleClick(params)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )
            },
        },

    ]

    return (
        <>
            <Box>
                {open ? (
                    <Alert
                        handleClick={handleDelete}
                        handleClose={handleClose}
                        id={idDelete}
                    />
                )
                    : null}
            </Box>

            <Box
                flex={1}
                flexDirection={"column"}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Header title="Lojas" subtitle="Gerenciamento de Lojas" />
                    <Link to={"cadastrar"}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            <Typography
                                color="white"
                            >
                                Lojas
                            </Typography>

                        </Button>
                    </Link>

                </Box>
                <Box
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#82c8f5",
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: "#82c8f5",
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                    }}
                >
                    <DataGrid rows={data} columns={columns} />
                </Box>

            </Box>
        </>
    )
}

export default Pagina_2;