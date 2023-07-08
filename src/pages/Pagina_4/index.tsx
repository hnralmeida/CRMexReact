import React, { useState, useEffect, useCallback } from 'react';
import api from "../../services/api";
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import Header from '../../components/Header'
import { colorTokens } from '../../colors'
import { Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate, Navigate } from 'react-router-dom';
// import { companyData, userData } from '../../types/authentication';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../contexts/authProvider'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../../components/Alert';
import { mockCidades } from '../../services/mocks';

const Pagina_4 = () => {

    const [refreshing, setRefreshing] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = useState("");

    const [dados, setDados] = useState<any>([]);

    const navigate = useNavigate();

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
        const getDelete = '/parcelas/' + id;
        console.log(getDelete);
        api.delete(getDelete).then(({ data }) => {
            console.log(data);
            console.log("then", data.request);
            handleClose();
            setRefreshing(true);
        }).catch((error) => {
            alert("Erro: " + error);
        });

    });

    const editSeller = useCallback(
        (params: GridCellParams) => () => {
            navigate('/parcelas/editar/' + params.id);
        }, []
    );

    useEffect(() => {
        setDados(mockCidades)
        setRefreshing(false);
    },
        [refreshing, Navigate]);

    const colors = colorTokens();

    const columns = [

        /* O campo "field" representa o nome do atributo no objeto e o
        "headerName" representa o nome que vai ficar na tabela  */

        {
            field: "id",
            headerName: "ID",
            flex: 1,
            cellClassName: "id-column--cel"
        },

        {
            field: "cidade",
            headerName: "Cidades",
            flex: 3
        },

        {
            field: "estado",
            headerName: "Estado",
            flex: 3,
            cellClassName: "name-column--cel"
        },

        {
            field: "buttons",
            headerName: "Ações",
            flex: 1,
            renderCell: (params: GridCellParams<any, any, any>) => {
                return (
                    <strong>
                        <IconButton
                            onClick={editSeller(params)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleClick(params)}>
                            <DeleteIcon />
                        </IconButton>
                    </strong>
                )
            },
        }
    ];

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

            <Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Header title="Cidade" subtitle="Gerenciamento de Cidade" />

                    <Link to={"/parcelas/cadastrar"}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            <Typography
                                color="white"
                            >
                                Cidade
                            </Typography>

                        </Button>
                    </Link>

                </Box>

                <Box
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
                    <DataGrid
                        rows={dados}
                        columns={columns}
                    />
                </Box>
            </Box>
        </>
    )

};

export default Pagina_4;