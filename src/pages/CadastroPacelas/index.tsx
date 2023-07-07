import Logo from '../../assets/Logo.png';
import { Box, Button, TextField } from "@mui/material";

import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
// import SendIcon from '@mui/icons-material/Send';
import Header from '../../components/Header';
import { Container, styled } from '@material-ui/core';
import { useAuth } from '../../contexts/authProvider';

// formulario
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';





const initialValues = {
    codigo_parcelas: "",
    descricao: "",


};

// Define a máscara para o input de telefone

/* USER SCHEMA: Usa o yup para criar as validações dos campos. Nesse caso, mostra quais são os campos obrigatórios e as mensagens para erros.
Também foi configurado para validar o telefone de acordo com a máscara
.matches(telefoneRegExp, 'Número de telefone inválido') */
const userSchema = yup.object().shape({
    codigo_formaspgto: yup.string().required("Campo obrigatório"),
    // nome: yup.string().required("Campo obrigatório"),
    descricao: yup.string().required("Campo obrigatório"),
    // cnpj: yup.string().required("Campo obrigatório").matches(onlyNumbers, "Digite um CNPJ válido no formato XX.XXX.XXX/0001-XX"),

});

const CadastroParcelas = () => {
    const { authData } = useAuth();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });
    console.log({ errors });
    console.log("RENDER");

    const isNonMobile = useMediaQuery("(min-width:600px)"); //Se passar desse tamanho, é considerado não-mobile

    const navigate = useNavigate();

    const onSubmit = (data: any) => {   //==> (values: any)
        const authID = authData ? authData.id : "0";

        setValue("id_empresa", authID);
        console.log(data._formValues);

        api.post('/cadparcelas/' + authID, data, {
            validateStatus: status => {
                return status < 405;
            }

        }).then(response => {
            if (response.status === 404) {
                alert('Erro ao criar Produto: ' + response.data);
            }
        }
        ).catch((error) => {
            console.error(error.message);
        });
        console.log(data.descricao + " enviado para cadastro");
        alert("cadastro realizado");
        navigate("/parcelas");


    }

    return (
        <Box m="20px">
            <Header title="CADASTRAR DE PARCELAS" subtitle="Cadastro de novas parcelas" />

            <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >

                <TextField
                    fullWidth
                    variant="filled"
                    placeholder=" Código da Pacelas"

                    error={!!errors["codigo_parcelas"]} // verifica se há um erro para o campo atual
                    helperText={errors["codigo_parcelas"]?.message?.toString()} // exibe a mensagem de erro para o campo atual

                    sx={{ gridColumn: "span 2" }}
                    {...register("codigo_parcelas", { required: true })}
                />




                <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Descrição"
                    
                    error={!!errors["descricao"]} // verifica se há um erro para o campo atual
                    helperText={errors["descricao"]?.message?.toString()} // exibe a mensagem de erro para o campo atual

                    sx={{ gridColumn: "span 2" }}
                    {...register("descricao", { required: true, minLength: 3 })} // aqui poderia por um temanho de caracteres mínimo usado o "minLength: 3" por exemplo

                />
            </Box>



            <Box
                display="flex"
                justifyContent="flex-end"
                mt="20px"
            >
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => handleSubmit(onSubmit)()}
                >
                    CADASTRAR
                </Button>
            </Box>

        </Box >





        
    );
}

export default CadastroParcelas;