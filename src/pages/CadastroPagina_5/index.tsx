// estilização
import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// services
import useMediaQuery from "@mui/material/useMediaQuery";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAuth } from '../../contexts/authProvider';

// Imagens
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from "@mui/icons-material/UploadFile";

// formulario
import { useForm, Controller } from 'react-hook-form';

// navegação
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material";
import React from "react";
import api from "../../services/api";


/// Marcaras 

// const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
// const onlyNumbers = new RegExp('([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})|[0-9]{15}');

// const userSchema = yup.object().shape({
//     codigo_produto: yup.string().required("Campo obrigatório"),
//     descricao: yup.string().required("Campo obrigatório"),
//     referencia: yup.string().required("Campo obrigatório"),
//     marca: yup.string().required("Campo obrigatório"),
//     estoque: yup.string().required("Campo obrigatório")
// });

function CadastroProduto() {
    //Se passar desse tamanho, é considerado não-mobile
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();

    const colors = useTheme();

    const { control, handleSubmit: onSubmit, formState: { errors } } = useForm(/*{ resolver: yupResolver(userSchema) }*/);

    const [imagens, setImagens] = React.useState('');


    const { authData } = useAuth();


    const handleImagesChange = (event: any) => {
        const files = event.target.files;
        setImagens(files);
        console.log(files);
    };

    const handleSubmit = (values: any) => {

        const postProduct = '/produtos/' + authData?.id;

        const formData = new FormData();
        formData.append('imagem', imagens);

        api.post(postProduct, values, {
            validateStatus: status => {
                return status < 405;
            }
        }).then(({ data }) => {
            if (data.status === 404) {
                console.log('listaItem:' + data.messagem);
            } else {
                console.log(data);

                const postImgen = '/imagem/' + data?.id_empresa;

                api.post(postImgen, formData, {
                    validateStatus: status => {
                        return status < 405;
                    }
                }).then(response => {
                    if (response.status === 404) {
                        alert('Erro ao fazer upload de imagem: ' + response.data);
                    }
                }).catch((error) => {
                    console.error(error.message + 'erro imagem');
                });
            }
        }).catch((error) => {
            console.error(error.message + 'erro fomulario de produto');
        });
        navigate("/produtos");

    }

    interface PropsProduto {
        name: string,
        label: string
        type?: string,
    }


    function InputProduto({ name, label, type }: PropsProduto) {
        return (
            <Box
                alignItems="center"
                m="40px 10px 0px 10px"
                sx={{ gridColumn: "span 2" }}
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
        <>
            <Box
                justifyContent="center"
                alignItems="center"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: '#ffffff',
                    width: '65vw',
                    height: '125vh'
                }}
            >
                <form onSubmit={onSubmit(handleSubmit)}>
                    <Box
                        sx={{
                            justifyContent: "flex-start",
                            width: '40%',
                        }}
                    >

                        <Header
                            title="Produto"
                            subtitle="Cadastrar Produtos"
                        />
                    </Box>

                    <Box
                        display="grid"
                        gap="1px"
                        alignContent="center"
                        // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        gridTemplateColumns="repeat(4, minmax(0, 50vw))"
                        sx={{ maxWidth: "50vw", "& > div": { gridColumn: isNonMobile ? undefined : "span 2" } }}
                    >
                        <InputProduto
                            name="codigo_produto"
                            label="Codigo do produto"
                        />

                        <InputProduto
                            name="descricao"
                            label="Descrição"
                        />

                        <InputProduto
                            name="referencia"
                            label="Referencia"
                        />

                        <InputProduto
                            name="marca"
                            label="Marca"
                        />
                        <Box
                            width='50vw'
                        >
                            <InputProduto
                                name="estoque"
                                label="Estoque"
                                type="number"
                            />
                        </Box>
                    </Box>
                    <Box
                        alignItems="center"
                        alignContent="center"
                        textAlign="center"
                        justifyContent="center"
                        ml="9px"
                        mt="25px"
                        width="96%"
                        border={2}
                        borderRadius={3}
                        sx={{ color: 'primary.main', borderColor: 'primary.main' }}
                    >

                        <Box
                            textAlign="center"
                            ml="150px"
                            mr="100px"
                            mt="25px"
                            sx={{ color: "white" }}>
                            {/* <UploadFileIcon
                                sx={{ fontSize: 45, color: "black" }} /> */}
                                <Box>
                                    {
                                        imagens ? <Box component="img"src={ imagens ? imagens : " " }/> : <UploadFileIcon sx={{ fontSize: 45, color: "black" }} />
                                    }
                                </Box>
                            {/* <Box
                                component="img"
                                src={imagens ? imagens : ""}
                            /> */}

                            Escolher imagens
                        </Box>
                        <Box
                            mt="25px"
                            ml="100px"
                            mb="25px"
                        >


                            <input
                                type="file"
                                multiple
                                onChange={handleImagesChange}
                                accept="image/*"
                            />
                        </Box>

                    </Box>

                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => onsubmit}
                        //onClick={() => handleSubmit()}
                        sx={{
                            width: "50%",
                            margin: "5% 25%"
                        }}
                    >
                        Cadastrar
                    </Button>

                </form>
            </Box>
        </>

    )
}

export default CadastroProduto