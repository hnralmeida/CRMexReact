import React, { useState, useEffect, useCallback } from 'react';
import api from "../../services/api";
import { DataGrid, GridCellParams, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import Header from '../../components/Header'
import { colorTokens } from '../../colors'
import { Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate, Navigate } from 'react-router-dom';
// import { companyData } from '../../types/authentication';
import AddIcon from '@mui/icons-material/Add';
// import { useAuth } from '../../contexts/authProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../../components/Alert';
import { mockItens } from '../../services/mocks';


const Pagina_1 = () => {

    const [content, setContent] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    //const { authData, changeLoader } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setContent(mockItens);
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
            navigate('/pagina_1/editar/' + params.id);
        }, []
    );

    const colors = colorTokens();

    const columns = [
        {
            field: "codigo_produto",
            headerName: "Código",
            flex: 1
        },
        {
            field: "nome_produto",
            headerName: "Nome",
            flex: 2
        },
        {
            field: "custo_bruto",
            headerName: "Custo",
            flex: 1,
            valueFormatter: (params: any) => `R$ ${params.value}`
        },
        {
            field: "impostos",
            headerName: "Taxas",
            flex: 1,
            valueFormatter: (params: any) => `R$ ${params.value}`
        },
        {
            field: "medida",
            headerName: "Medida",
            flex: 2
        },
        {
            field: "referencia",
            headerName: "Referência",
            flex: 1
        },
        {
            field: "buttons",
            headerName: "Ações",
            flex: 1,
            renderCell: (params: any) => {
                return (
                    <strong>
                        <IconButton onClick={editSeller(params)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleClick(params)}>
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

            <Box m="0">

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Header title="Itens" subtitle="Gerenciamento de Itens" />
                    
                    <Link to={"cadastrar"}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            <Typography
                                color="white"
                            >
                                Itens
                            </Typography>

                        </Button>
                    </Link>

                </Box>
                <Box
                    p="10px 0 0 0"
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
                    <DataGrid rows={content} columns={columns} getRowClassName={getRowClassName} />
                </Box>
            </Box>
        </>
    )
};

export default Pagina_1;