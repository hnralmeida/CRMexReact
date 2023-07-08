import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import api from "../../services/api";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../../contexts/authProvider";
import { companyData } from "../../types/authentication";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Switch } from '@mui/material';
import Pagina_1 from "../Pagina_1";
import { color } from "@material-ui/system";

const SwitchButton = ({ isToggled, handleToggle }: { isToggled: boolean; handleToggle: () => void }) => {
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

interface initialValues {
    id: number,
    id_empresa: number,
    codigo_vendedor: string,
    nome_vendedor: string,
    mac_auth: string,
    email: string,
    ativo: boolean
}

const EditarPagina_1 = () => {

    const emailRegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

    const userSchema = yup.object().shape({
        codigo_vendedor: yup.string().required("Campo nome obrigatório"),
        nome_vendedor: yup.string().required("Campo nome obrigatório"),
        mac_auth: yup.string().required("Campo código usuário obrigatório"),
        email: yup.string().email("Email inválido").required("Campo e-mail é obrigatório").matches(emailRegExp, "Email deve seguir os devidos padrões : exemplo@exemplo.com"),
        ativo: yup.boolean()
    });
    const [isToggled, setIsToggled] = useState(false); // Adicionando o estado "isToggled"

    const handleToggle = () => {
        setValue("ativo", !isToggled);
        setIsToggled(!isToggled);
    };

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { id } = useParams();
    const [vendedores, setVendedores] = useState<initialValues>();
    const { authData, changeLoader } = useAuth();
    const { control, setValue, handleSubmit: onSubmit, formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });

    // const [user, setUser] = useState<companyData>();

    const handleClick = (values: any) => {
        values.id_empresa = authData?.id;
        console.log("submit ", values._formValues);
        const editUsers = '/usuarios/' + id;

        api.put(editUsers, values._formValues, {
            headers: {
                'Content-Type': 'application/json',
            },
            validateStatus: status => {
                return status < 405;
            }
        }
        ).then(() => {
            console.log(values.nome + " editado com sucesso");
            navigate('../vendedor');
        })
    }

    useEffect(() => {
        console.log(vendedores, vendedores ? vendedores["ativo"] : null)
        if (vendedores) {
            Object.keys(vendedores).forEach((key) => {
                setValue(key as keyof initialValues, vendedores[key as keyof initialValues]);
            });
            setIsToggled(vendedores["ativo"])
        }
    }, [vendedores]);

    useEffect(() => {
        const getAuth = '/usuario/' + id;

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
                setVendedores(data);
            }
            changeLoader(false);
        });
    }, []);

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
            <Header title="EDITAR VENDEDOR" subtitle="Editar Vendedor" />

            <form onSubmit={onSubmit(handleClick)}>
                <Box sx={{ color: 'black' }}>
                    <SwitchButton isToggled={isToggled} handleToggle={handleToggle} />
                </Box>


                < InputVendedor

                    name="codigo_usuario"
                    label='Codigo do Vendedor'

                />
                < InputVendedor

                    name="nome_usuario"
                    label='Nome do Vendedor'

                />
                < InputVendedor

                    name="mac_auth"
                    label='Chave de Autentiticação'

                />

                < InputVendedor

                    name="email"
                    label='E-mail'

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


export default EditarPagina_1;
