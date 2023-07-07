import React, { useState, useEffect, useCallback } from 'react';
import api from "../../services/api";
import { DataGrid, GridCellParams, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import Header from '../../components/Header'
import { colorTokens } from '../../colors'
import { Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { companyData } from '../../types/authentication';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../contexts/authProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../../components/Alert';


const Vendedores = () => {

    const [vendedores, setVendedores] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { authData, changeLoader } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const request = '/userCompany/' + authData?.id;
        console.log(request);
        changeLoader(true);

        api.get(request, {
            validateStatus: status => {
                return status < 405;
            }

        }).then(({ data }) => {

            if (data.status === 404) {
                console.log('listaItem: ' + data.message);
            } else {
                const vendedoresTransformados = data.map((item: any) => ({
                    ...item,
                    ativo: item.ativo ? 'Ativo' : 'Desativado',
                }));
                console.log(vendedoresTransformados);
                setVendedores(vendedoresTransformados);
            }

            changeLoader(false);
        }).catch((error) => {
            console.log(error);
        });
        setRefreshing(false);
    }, [refreshing, Navigate]);

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

    const handleDelete = ((id: any) => {
        const getDelete = '/users/' + id;
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

    const editSeller = useCallback(
        (params: GridCellParams) => () => {
            navigate('/vendedor/editar/' + params.id);
        }, []
    );

    const colors = colorTokens();
    const columns = [
        {
            field: "codigo_usuario", headerName: "Código"
        },
        {
            field: "nome_usuario", headerName: "Nome", flex: 1
        },

        {
            field: "email", headerName: "Email", flex: 1
        },

        {
            field: "mac_auth", headerName: "MAC", flex: 1

        },
        {
            field: "ativo", headerName: "Ativo", flex: 1

        },
        {
            field: "buttons",
            headerName: "Ações",
            flex: 1,
            renderCell: (params: GridCellParams<any, any, any, any>) => {
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
    const getRowClassName = (params: any) => {
        const isInactive = !params.row.ativo;
        return isInactive ? "inactive-row" : "";
    };

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

            <Box m="20px">

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Header title="VENDEDORES" subtitle="Gerenciamento de vendedores" />
                    <Link to={"cadastrar"}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            <Typography
                                color="white"
                            >
                                Cadastrar Vendedor
                            </Typography>

                        </Button>
                    </Link>

                </Box>
                <Box
                    m="40px 0 0 0"
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
                    <DataGrid rows={vendedores} columns={columns} getRowClassName={getRowClassName} />
                </Box>
            </Box>
        </>
    )
};

export default Vendedores;