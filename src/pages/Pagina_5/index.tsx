// services
import api from "../../services/api";
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import React from "react";

// types e contextos 
import { useAuth } from '../../contexts/authProvider'
import { useNavigate, Navigate } from 'react-router-dom';
// import { companyData, userData } from "../../types/authentication";

// estilização
import AddIcon from '@mui/icons-material/Add';
import { colorTokens } from '../../colors'
import Header from "../../components/Header";
import { Box, Typography, Button, IconButton } from '@mui/material';
import { DataGrid, GridCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../../components/Alert';
import { mockCategoria } from "../../services/mocks";

export function Pagina_5() {

    const [dados, setDados] = useState<any>([]);
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
        const getDelete = '/produto/' + id;
        api.delete(getDelete).then(({ data }) => {
            console.log("then", data.request);
            handleClose();
            //window.location.reload();
            setRefreshing(true);
        });

    });

    const handleEdit = useCallback(
        (params: GridCellParams) => () => {
            console.log("ID: " + params.id);
            navigate('/produtos/editar/' + params.id);
        }, []

    );

    useEffect(() => {

        setDados(mockCategoria);
        setRefreshing(false);

    }, [refreshing, Navigate]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "codigo",
            headerName: "Codigo do Produto",
            flex: 1,
        },
        {
            field: "descricao",
            headerName: "Descrição",
            flex: 2,
            valueGetter: (params: GridValueGetterParams) => {
                const { id } = params.row;
                if (id === 0) {
                    params.api.getRowElement(id)?.style.setProperty("display", "none");
                }
                // Lógica para obter a descrição com base no id
                const descricao = params.row.descricao;
                return descricao;
              },
        },
        {
            field: "super",
            headerName: "Subcategoria",
            flex: 2,
            valueGetter: (params: any) => {
                const idParent = params.row.super;
                const otherRow = params.api.getRow(idParent);
                return otherRow.descricao;
            },
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
                            onClick={handleEdit(params)}
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

                    <Header title="Categorias" subtitle="Gerenciamento de Categorias" />

                    <Link to={"/cadastrar"}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            <Typography
                                color="white"
                            >
                                Cadastrar Produto
                            </Typography>

                        </Button>
                    </Link>

                    {/* : null */}
                    {/* } */}

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
                    <DataGrid rows={dados} columns={columns} />
                </Box>

            </Box>
        </>
    )
}

export default Pagina_5;