import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import api from "../../services/api";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/authProvider";
// import { companyData } from "../../types/authentication";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Switch } from '@mui/material';
// import Vendedores from "../Vendedor";
// import { color } from "@material-ui/system";

const SwitchButtonAtivo = ({ isToggled, handleToggle }: { isToggled: boolean; handleToggle: () => void }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isToggled}
                    onChange={handleToggle}
                />
            }

            label={
                isToggled ? 'ATIVO' : 'DESATIVADO'}

        />
    );
};

const SwitchButtonBloqueado = ({ isToggledB, handleToggleB }: { isToggledB: boolean; handleToggleB: () => void }) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={isToggledB}
                    onChange={handleToggleB}
                />
            }

            label={
                isToggledB ? 'BLOQUEADO' : 'DESBLOQUEADO'}

        />
    );
};

interface initialValues {
    id: number,
    id_empresa: number,
    id_usuario: number,
    codigo_cliente: string,
    razao_social: string,
    nome_fantasia: string,
    cnpj: string,
    IE: string,
    segmento: string,
    email_empresarial: string,
    endereco: string,
    bairro: string,
    cidade: string,
    cep: string,
    uf: string,
    numero: string,
    telefone: string,
    whatsapp: string,
    contator: string,
    resp_empresa: string,
    email: string,
    observacao: string,
    bloqueado: boolean,
    ativo: boolean
}

const EditarPagina_2 = () => {

    // const emailRegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    const userSchema = yup.object().shape({
        // codigo_cliente: yup.string().required("Campo código obrigatório"),
        // razao_social: yup.string().required("Campo razão social obrigatório"),
        // nome_fantasia: yup.string().required("Campo nome fantasia usuário obrigatório"),
        // email: yup.string().email("Email inválido").required("Campo e-mail é obrigatório").matches(emailRegExp, "Email deve seguir os devidos padrões : exemplo@exemplo.com"),
        bloqueado: yup.boolean(),
        ativo: yup.boolean()
    });
    const [isToggled, setIsToggled] = useState(false); // Adicionando o estado "isToggled"
    const [isToggledB, setIsToggledB] = useState(false);

    const handleToggle = () => {
        setValue("ativo", !isToggled);
        setIsToggled(!isToggled);
    };

    const handleToggleB = () => {
        setValue("bloqueado", !isToggledB);
        setIsToggledB(!isToggledB);
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { id } = useParams();
    const [clientes, setClientes] = useState<initialValues>();
    const { authData, changeLoader } = useAuth();
    const { control, setValue, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });

    // const [user, setUser] = useState<companyData>();

    const handleClick = (values: any) => {
        values.id_empresa = authData?.id;
        console.log("submit ", values._formValues);
        const editClient = '/cliente/' + id;

        api.put(editClient, values._formValues, {
            headers: {
                'Content-Type': 'application/json',
            },
            validateStatus: status => {
                return status < 405;
            }
        }
        ).then(() => {
            console.log(values.nome + " editado com sucesso");
            navigate('../clientes');
        })
    }

    useEffect(() => {
        console.log(clientes, clientes ? clientes["bloqueado"] : null)
        if (clientes) {
            Object.keys(clientes).forEach((key) => {
                setValue(key as keyof initialValues, clientes[key as keyof initialValues]);
            });
            setIsToggled(clientes["ativo"])
            setIsToggledB(clientes["bloqueado"])
        }
    }, [clientes]);

    useEffect(() => {
        const getAuth = '/cliente/' + id;

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
                setClientes(data);
            }
            changeLoader(false);
        });
    }, []);

    interface PropsCliente {
        name: string,
        label: string
        type?: string,
        placeholder?: string
    }

    function InputCliente({ name, label, placeholder, type }: PropsCliente) {
        return (
            <Box
                alignItems="center"
                m="40px 10px 0px 10px"
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
            <Header title="EDITAR CLIENTE" subtitle="Editar Cliente" />

            <form onSubmit={onSubmit(handleClick)}>
                <Box sx={{ color: 'black' }}>
                    <SwitchButtonAtivo isToggled={isToggled} handleToggle={handleToggle} />
                </Box>

                <Box sx={{ color: 'black' }}>
                    <SwitchButtonBloqueado isToggledB={isToggledB} handleToggleB={handleToggleB} />
                </Box>


                < InputCliente

                    name="codigo_cliente"
                    label='Codigo do Cliente'

                />
                < InputCliente

                    name="razao_social"
                    label='Razão Social'

                />
                < InputCliente

                    name="nome_fantasia"
                    label='Nome Fantasia'

                />

                < InputCliente

                    name="cnpj"
                    label='Cnpj'

                />

                < InputCliente

                    name="IE"
                    label='IE'

                />

                < InputCliente

                    name="segmento"
                    label='Segmento'

                />

                < InputCliente

                    name="email_empresarial"
                    label='Email Empresarial'

                />

                < InputCliente

                    name="endereco"
                    label='Endereço'

                />

                < InputCliente

                    name="bairro"
                    label='Bairro'

                />

                < InputCliente

                    name="cidade"
                    label='Cidade'

                />

                < InputCliente

                    name="cep"
                    label='Cep'

                />

                < InputCliente

                    name="uf"
                    label='Uf'

                />

                < InputCliente

                    name="numero"
                    label='Número'

                />

                < InputCliente

                    name="telefone"
                    label='Telefone'

                />

                < InputCliente

                    name="whatsapp"
                    label='Whatsapp'

                />

                < InputCliente

                    name="contator"
                    label='Contador'

                />

                < InputCliente

                    name="resp_empresa"
                    label='Responsável da Empresa'

                />

                < InputCliente

                    name="email"
                    label='Email'

                />

                < InputCliente

                    name="observacao"
                    label='Observação'

                />

                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>

                </Box>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    mt="20px"
                >


                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClick(control);
                        }}
                    >
                        <Typography
                            color="white"
                        >
                            Enviar Alteração
                        </Typography>

                    </Button>

                </Box>
            </form>

        </Box>
    )
}


export default EditarPagina_2;
