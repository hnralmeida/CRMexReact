import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/authProvider";
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

import { Controller, useForm } from 'react-hook-form'

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { ExternalAuthService } from "../../../firebase";

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

const CadastroVendedor = () => {
    const userSchema = yup.object().shape({
        codigo_usuario: yup.string(),
        nome_usuario: yup.string().required("Campo nome obrigatório"),
        mac_auth: yup.string(),
        email: yup.string().email("Email inválido").required("Campo e-mail é obrigatório"),
        senha: yup.string().required("Campo obrigatório").
            matches(passwordRegExp, "Mínimo de 8 caracteres, 1 letra maiúscula e um caractere especial.")

    });
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();
    //const { id } = useParams();

    const { authData } = useAuth();

    const [validUser, setValidUser] = useState(true);

    const { control, setValue, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });

    useEffect(() => {
        setValue("id_empresa", authData?.id)
    }, []
    );

    useEffect(() => {
        setTimeout(() => {
            setValidUser(true);
            if (validUser) {
                //alert('Erro ao criar vendedor: Este login já existe');
            }
        }, 5000);
    }, [validUser]
    );


    const handleSubmit = () => {
        setValue("nome_empresa", authData?.nome_fantasia);
        const values = control._formValues;

        console.log(values);
        const rota = "/usuarios";
        api.post(rota, values, {
            headers: {
                'Content-Type': 'application/json',
            },
            validateStatus: status => {
                return status < 405;
            }
        }
        ).then((res) => {
            if (res.status === 404) {
                console.log('Invalid User credentials');
                setValidUser(false);
            } else {
                const app = ExternalAuthService.getInstance();
                console.log(res);
                app.createUserWithEmailAndPassword(control._formValues, Number(res.data.id))
                console.log(values.nome + " enviado para cadastro");
                navigate('../vendedor');
            }
        })
    }


    interface PropsVendedor {
        name: string,
        label: string
        type?: string,
        placeholder?: string
    }

    function InputVendedor({ name, label, placeholder, type }: PropsVendedor) {
        return (
            <Box
                alignItems="center"
                m="20px 10px 0px 10px"
                sx={{ gridColumn: "span 2" }}
            >
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            focused
                            type={type || "text"}
                            placeholder={placeholder || ""}
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
        <Box m="20px">
            <Header title="CADASTRAR VENDEDOR" subtitle="Cadastro de novo vendedor" />

            <form onSubmit={onSubmit(handleSubmit)}>
                < InputVendedor

                    name="codigo_usuario"
                    label='Código Usuário'
                    placeholder='Código Vendedor (Opcional)'
                />
                < InputVendedor

                    name="nome_usuario"
                    label='Nome do Vendedor'
                    placeholder='Nome do Vendedor'

                />
                < InputVendedor

                    name="mac_auth"
                    label='Chave de Autentiticação'
                    placeholder='Chave Única do Dispositivo (Opcional)'
                />


                < InputVendedor

                    name="email"
                    label='E-mail'
                    placeholder='Email (fulano@exemplo.com)'

                />

                < InputVendedor
                    type='password'
                    name="senha"
                    label='Senha Provisória'
                    placeholder='••••••••••'

                />

                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>

                </Box>
                <Box
                    display="flex"
                >

                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{
                            width: "50%",
                            margin: "5% 25%"
                        }}
                    >
                        Cadastrar
                    </Button>

                </Box>
            </form>

        </Box>
    )

}
export default CadastroVendedor;