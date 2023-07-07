import React, { useState, useEffect, useCallback } from 'react';
import api from "../../services/api";
import { DataGrid, GridCellParams, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import Header from '../../components/Header'
import { colorTokens } from '../../colors'
import { Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate, Navigate} from 'react-router-dom';
// import { companyData, userData } from '../../types/authentication';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../contexts/authProvider'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../../components/Alert';

const FormaPgto = () => {

    const [Formapgto, setFormapgto] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { authData, changeLoader } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [idDelete, setIdDelete] = useState("");

    const [empresa, setEmpresa] = useState([]);


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
        const getDelete = '/formapagto/' + id;
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
            navigate('/pagamentos/editar/' + params.id);
        }, []
    );




    useEffect(() => {


        const getAuth = '/formapgtoid/' + 12; //+ authData?.id;
        console.log(authData, "RENDER");
         
        // let getAuth = "";

        // (authData?.tipo == "vendedor") ? getAuth = 'clients/list/' + (authData as userData).id : null;
        // (authData?.tipo == "gerente") ? getAuth = 'clients/list/' + (authData as userData).id : null;
        // (authData?.tipo == "empresa") ? getAuth = 'clients/clist/' + (authData as companyData).id : null;

        changeLoader(true);
        api.get(getAuth, {
            validateStatus: status => {
                return status < 405;
            }
        }).then(({ data }) => {
            if (data.status === 404) {
                console.log('listaItem: ' + data.message);
            } else {
                setFormapgto(data)
            }
            changeLoader(false);
        });
    },
        [refreshing, Navigate]);

    const colors = colorTokens();   
    const columns = [

        /* O campo "field" representa o nome do atributo no objeto e o
        "headerName" representa o nome que vai ficar na tabela  */
        
        {
            field: "id", headerName: "ID", flex: 3, cellClassName: "id-column--cel"
        },

        {
            field: "codigo_formaspgto", headerName: "Código do formato do pagamento", flex: 3
        },
        
        {
            field: "descricao", headerName: "Descrição", flex: 3, cellClassName: "name-column--cel"
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

            <Box m="20px">

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Header title="FORMAS DE PAGAMENTO" subtitle="Gerenciamento de formas de pagamento" />

                    <Link to={"/pagamento/cadastrar"}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            <Typography
                                color="white"
                            >
                                Cadastrar Forma de pagamento
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
                    <DataGrid
                        rows={Formapgto}
                        columns={columns}
                    />
                </Box>
            </Box>
        </>
    )
    
};

export default FormaPgto;