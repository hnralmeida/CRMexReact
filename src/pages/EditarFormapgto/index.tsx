import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// services
import useMediaQuery from "@mui/material/useMediaQuery";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// Imagens
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from "@mui/icons-material/UploadFile";

// formulario
import { useForm, Controller } from 'react-hook-form';

// navegação
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from "@mui/material";
import React from "react";

//types

import api from "../../services/api";
import { useAuth } from "../../contexts/authProvider";
import { formapgtoData } from "../../types/authentication";



function EditarFormapgto() {
    //Se passar desse tamanho, é considerado não-mobile
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();

    const colors = useTheme();

    const { control, handleSubmit: onSubmit, formState: { errors }, setValue } = useForm();
    const { changeLoader } = useAuth();
    const [formapgto, setFormapgto] = React.useState<formapgtoData>();
    const { id } = useParams();

    const handleSubmit = (values: any) => {

        const editFormapgto = '/formapgtos/' + formapgto?.id;

        api.put(editFormapgto, values, {
            validateStatus: status => {
                return status < 405;
            },
        }
        ).then(() => {
            console.log(values.descricao + " editado com sucesso");
            navigate('../pagamento');
        })
        console.log("submit");
        navigate("/pagamento");
    }

    React.useEffect(() => {
        if (formapgto) {
            Object.keys(formapgto).forEach((key) => {
                setValue(key as keyof formapgtoData, formapgto[key as keyof formapgtoData]);
            });
        }
    }, [formapgto, setValue]);

    React.useEffect(() => {
        const getAuth = '/formapgto/' + id;

        changeLoader(true);

        api.get(getAuth, {
            validateStatus: status => {
                return status < 405;
            }
        }).then(({ data }) => {
            if (data.status === 404) {
                console.log('listaItem:' + data.message);
            } else {
                console.log(data);
                setFormapgto(data);
            }
            changeLoader(false);
        });
    }, []);


    interface PropsFormapgto {
        name: string,
        label: string,
        type?: string,
    }

    function InputEmpresa({ name, label, type }: PropsFormapgto) {
        return (
            <Box
                alignItems="center"
                m="40px 10px 0px 10px"
                sx={{ gridColumn: "span 4" }}
            >

                {/* Nome Fantasia */}
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            focused
                            type={type || "text"}
                            onChange={onChange}
                            value={value}
                            label={label}
                            error={!!errors[name]} // verifica se há um erro para o campo atual
                            helperText={errors[name]?.message?.toString()} // exibe a mensagem de erro para o campo atual
                            InputProps={{
                                style: {
                                    color: 'black',
                                }
                            }}
                        />
                    )} />

            </Box>
        )
    }

    return (
        <Box
            display="flex"
            m="40px 0 0 10px"
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: '#ffffff',
            }}
        >
            <form onSubmit={onSubmit(handleSubmit)}>

                <Header
                    title="Forma de pagamento"
                    subtitle="Editar Forma de pagamento"
                    text-align="center"
                />


                <Box
                    display="grid"
                    gap="1px"
                    alignContent="center"
                    // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    gridTemplateColumns="repeat(12, minmax(0, 100vw))"
                    sx={{ maxWidth: "100vw", "& > div": { gridColumn: isNonMobile ? undefined : "span 2" } }}
                >
                    <Box
                        alignItems="center"
                        m="40px 10px 0px 10px"
                        sx={{ gridColumn: "span 2" }}
                    ></Box>

                    <InputEmpresa
                        name="codigo_formaspgto"
                        label="Codigo do produto"

                    />

                    <InputEmpresa
                        name="descricao"
                        label="Descrição"
                    />
                    <Box
                        alignItems="center"
                        m="40px 10px 0px 10px"
                        sx={{ gridColumn: "span 2" }}
                    ></Box>
                    <Box
                        alignItems="center"
                        m="40px 10px 0px 10px"
                        sx={{ gridColumn: "span 5" }}
                    ></Box>

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => onsubmit}
                    sx={{ gridColumn: "span 2", marginTop: "25px" }}
                >
                    Editar
                </Button>

                </Box>

            </form>
        </Box>

    )
}

export default EditarFormapgto