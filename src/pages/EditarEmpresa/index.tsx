// React
import React from 'react';

// estilização
import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

// Imagens
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// serviços
import { companyData } from "../../types/authentication";

// formulario
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../contexts/authProvider';

// navegação
import Alert from '../../components/Alert';
import Api from '../../services/api';
import Loading from '../../components/Loader';
import { ExternalAuthService } from '../../../firebase';
import UserConfirm from '../../components/UserConfirm';

interface Props {
    empresa?: companyData | null;
}

function UpdateEmpresa( ) {

    const [subt, setSubt] = React.useState("");
    const [switchButtons, setSwitchButtons] = React.useState<boolean>(true);
    const [AlertExcluir, setAlertExcluir] = React.useState<boolean>(false);
    const [AlertEdit, setAlertEdit] = React.useState<boolean>(false);
    const app = ExternalAuthService.getInstance();

    const { authData, isLoading, changeLoader, signIn, signOut } = useAuth();

    const { control, setValue } = useForm();

    React.useEffect(() => {
            const empresa = authData ? authData : {id:"", nome_fantasia:"", razao_social:""}
            setSubt("Editar Empresa");
            const keys = Object.keys(empresa);
            const values = Object.values(empresa);

            (keys).forEach(key => {
                setValue(key, values.at(keys.indexOf(key)));
            })

    }, []);

    function handleDelete(id?: number, email?: string) {
        const useId = id ? id : 0;
        const useEmail = email ? email : "email@example.com";
        changeLoader(true);
        console.log(useId, useEmail);
        Api.put("/empresa/delete/" + useId).then((data) => {
            console.log(data);
            const app = ExternalAuthService.getInstance();
            app.deleteUser(useEmail).then(() => signOut());
        }).catch((erro) => {
            alert(erro.message);
        }).finally(() => {
            setAlertExcluir(false);
            changeLoader(false);
        });
    }

    function handleEdit() {
        setSwitchButtons(false);
    }

    async function editRequest(senha: string) {
        const app = ExternalAuthService.getInstance();
        console.log("sign in " + switchButtons);

        app.signInWithEmailAndPassword(control._formValues.email, senha).then((data) => {
            if (data?.id == control._formValues.id) {
                app.updateUser(control._formValues).then(() => {
                    setSwitchButtons(true);

                    signOut().then(() => {
                        signIn(control._formValues.email, senha);
                    })
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
        }).catch((erro) => {
            alert(erro.message);
        }).finally(() => {
            setAlertEdit(!AlertEdit);
        });
    }

    interface PropsEmpresa {
        name: string,
        label: string
    }

    function InputEmpresa({ name, label }: PropsEmpresa) {
        return (
            <Box
                alignItems="center"
                m="40px 0px 0px 0px"
            >

                {/* Nome Fantasia */}
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            focused
                            disabled={switchButtons}
                            onChange={onChange}
                            value={value}
                            label={label}
                        />
                    )} />

            </Box>
        )
    }

    return (
        <>
            <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                m="40px 40px 40px 40px"
            >

                <Header title="Empresas" subtitle={subt} />

                {AlertExcluir ? (
                    <Alert handleClick={() => handleDelete(authData?.id, authData?.email)}
                        handleClose={() => setAlertExcluir(!AlertExcluir)}
                        msg="Desativar sua conta?"
                        id={String(authData?.id)}
                    />
                ) : null}

                {AlertEdit ? (
                    <UserConfirm handleClick={editRequest}
                        handleClose={() => setAlertEdit(!AlertEdit)}
                    />
                ) : null}

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

                {switchButtons ? (
                    <Box
                        display="flex"
                        justifyContent="space-around"
                        alignItems="space-between"
                        m="40px 0px 0px 40px"
                    >

                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                                setAlertExcluir(true);
                            }}
                        >
                            <Typography
                                color="white"
                            >
                                Desativar Conta
                            </Typography>

                        </Button>

                        <Button
                            color="secondary"
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => {
                                handleEdit();
                            }}
                        >
                            <Typography
                                color="white"
                            >
                                Editar empresa
                            </Typography>

                        </Button>

                    </Box>
                ) : (
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => setAlertEdit(true)}
                        sx={{
                            gridColumn: "span 1",
                            width: "100%",
                            margin: "40px 0px 0px 0px"
                        }}
                    >
                        Atualizar
                    </Button>
                )}
            </Box>

            {isLoading ? <Loading /> : null}
        </>

    )
}

export default UpdateEmpresa