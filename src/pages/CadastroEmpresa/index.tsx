// estilização
import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';

// services
import useMediaQuery from "@mui/material/useMediaQuery";
import { ExternalAuthService } from "../../../firebase";

// Imagens
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// formulario
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';

// navegação
import { useNavigate } from 'react-router-dom';
import Alert from "../../components/Alert";

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
const onlyNumbers = new RegExp('([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})|[0-9]{15}');

const userSchema = yup.object().shape({
    cnpj: yup.string().required("Campo obrigatório").matches(onlyNumbers, "Digite um CNPJ válido no formato XX.XXX.XXX/0001-XX"),
    razao_social: yup.string().required("Campo obrigatório"),
    nome_fantasia: yup.string().required("Campo obrigatório"),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    senha: yup.string().
        required("Campo obrigatório").
        matches(passwordRegExp, "Mínimo de 8 caracteres, 1 letra maiúscula e um caractere especial."),
    canhoto: yup.string()
        .required("Campo obrigatório")
        .oneOf([yup.ref('senha')], 'Senhas precisam ser iguais')
});

function CriarEmpresa() {
    //Se passar desse tamanho, é considerado não-mobile
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate();

    const { control, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });

    function handleSubmit() {
        const app = ExternalAuthService.getInstance();

        console.log("submit answer: " + control._formValues);
        app.createEmpresaWithEmailAndPassword(control._formValues, 1).then(() => {
            navigate("login");
        });

    }

    const [backWarning, setBackWarning] = React.useState(false);

    function handleBack() {
        if (control._formValues.nomefantasia) {
            setBackWarning(true);
        } else {
            navigate("/");
        }
    }
    interface PropsEmpresa {
        name: string,
        label: string
        type?: string,
        placeholder?: string
    }

    function InputEmpresa({ name, label, placeholder, type }: PropsEmpresa) {
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
                            placeholder={placeholder || ""}
                            onChange={onChange}
                            value={value}
                            label={label}
                            error={!!errors[name]} // verifica se há um erro para o campo atual
                            helperText={errors[name]?.message?.toString()} // exibe a mensagem de erro para o campo atual
                            InputProps={{
                                style: {
                                    color: 'white',
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
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                m="0"
                sx={{
                    backgroundColor: '#092458',
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <Box
                    sx={{
                        width: '100vw',
                        height: '5vh',
                    }}
                >
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => handleBack()}
                        sx={{
                            width: '10%',
                            m: '2.5vh'
                        }}
                    >
                        Voltar
                    </Button>
                </Box>
                {backWarning ? (
                    <Alert
                        handleClick={() => { navigate("/") }}
                        handleClose={() => { setBackWarning(false) }}
                    />
                ) : null}

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: '100vw',
                        height: '90vh'
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
                                title="Empresas"
                                subtitle="Cadastrar Empresa"
                                color="white"
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
                            <InputEmpresa
                                name="nome_fantasia"
                                label="Nome Fantasia"
                            />

                            <InputEmpresa
                                name="razao_social"
                                label="Razão Social"
                            />

                            <InputEmpresa
                                name="cnpj"
                                label="CNPJ"
                            />

                            <InputEmpresa
                                name="email"
                                label="Email"
                            />
                            <InputEmpresa
                                name="senha"
                                label="Senha"
                                type="password"
                            />
                            <InputEmpresa
                                name="canhoto"
                                label="Confirmar senha"
                                type="password"
                            />


                        </Box>

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

                    </form>

                </Box>

            </Box>
        </>

    )
}

export default CriarEmpresa