import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from "../../contexts/authProvider";
import { useForm } from "react-hook-form";

const CadastroPagina_2 = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)"); //Se passar desse tamanho, é considerado não-mobile
    const [page1, setPage1] = useState(true);
    const [page2, setPage2] = useState(false);
    const [page3, setPage3] = useState(false);

    const { register, handleSubmit,formState: { errors } } = useForm();

    const { authData } = useAuth();

    const navigate = useNavigate();

    const handleFormSubmit = (values: any) => {
        // console.log(values);
        // authData ? values.id_usuario = authData.id : null;
        // values.data_i ? values.data_i = new Date(values.data_i) : null;
        // values.data_d ? values.data_d = new Date(values.data_d) : null;
        // values.data_v ? values.data_v = new Date(values.data_v) : null;
        // values.data_f ? values.data_f = new Date(values.data_f) : null;
        // dados que não são enviados ainda (bollean que falta no mobile): 
        // interessado,
        // demonstracao,
        // visita,
        // fechada
        const postAuth1 = 'clientes/' + authData?.id;
        console.log(values);
        api.post(postAuth1, values, {
            validateStatus: status => {
                return status < 405;
            }
        }).then(response => {
            if (response.status === 404) {
                alert('Erro ao criar Cliente: ' + response.data);
            } else {
                alert('Cliente Cadastrado: Atualize a página');
                navigate('../clientes');
            }
        }
        ).catch((error) => {
            console.error(error.message);
        });

    }
   
    return (
        <Box m="20px">
            <Header title="CADASTRAR CLIENTE" subtitle="Cadastro de novo Cliente" />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box>
                    {!page1 ? null :
                        <Box
                            display="grid"
                            justifyContent="flex-end"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            mt="20px"
                            mb="20px"
                        >
                            <Button
                                disabled
                                color="secondary"
                                variant="contained"
                                endIcon={<NavigateBeforeIcon />}
                                sx={{ gridColumn: "span 1" }}
                            >
                                Anterior
                            </Button>
                            <Box
                                sx={{ gridColumn: "span 6" }}
                            />

                            <Button
                                color="secondary"
                                variant="contained"
                                endIcon={<NavigateNextIcon />}
                                sx={{ gridColumn: "span 1" }}
                                onClick={() => {
                                    setPage1(false);
                                    setPage2(true);
                                }}
                            >
                                Próximo
                            </Button>
                        </Box>
                    }

                    {!page2 ? null :
                        <Box
                            display="grid"
                            justifyContent="flex-end"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            mt="20px"
                            mb="20px"
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                endIcon={<NavigateBeforeIcon />}
                                sx={{ gridColumn: "span 1" }}
                                onClick={() => {
                                    setPage2(false);
                                    setPage1(true);
                                }}
                            >
                                Anterior
                            </Button>

                            <Box
                                sx={{ gridColumn: "span 6" }}
                            />

                            <Button
                                color="secondary"
                                variant="contained"
                                endIcon={<NavigateNextIcon />}
                                sx={{ gridColumn: "span 1" }}
                                onClick={() => {
                                    setPage2(false);
                                    setPage3(true);
                                }}
                            >
                                Próximo
                            </Button>
                        </Box>
                    }

                    {!page3 ? null :
                        <Box
                            display="grid"
                            justifyContent="flex-end"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            mt="20px"
                            mb="20px"
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                endIcon={<NavigateBeforeIcon />}
                                sx={{ gridColumn: "span 1" }}
                                onClick={() => {
                                    setPage3(false);
                                    setPage2(true);
                                }}
                            >
                                Anterior
                            </Button>

                        </Box>
                    }
                </Box>

                {!page1 ? null : (
                    <Box>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                                border: 1,
                                padding: 2,
                                borderColor: 'primary.100',
                            }}
                        >
                            <Typography sx={{ gridColumn: "span 8" }}>
                                Dados:
                            </Typography>
                            {/* Linha 1 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Razao Social"
                                name="razao_social"
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nome Fantasia"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.nome_fantasia}
                                name="nome_fantasia"
                                // error={!!touched.nome_fantasia && !!errors.nome_fantasia} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.nome_fantasia && errors.nome_fantasia}
                                sx={{ gridColumn: "span 4" }}
                            />


                            {/* Linha 2 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="CNPJ"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={numberMask(values.cnpj)}
                                name="cnpj"
                                // error={!!touched.cnpj && !!errors.cnpj} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.cnpj && errors.cnpj}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="IE"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={numberMask(values.IE)}
                                name="IE"
                                // error={!!touched.IE && !!errors.IE} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.IE && errors.IE}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Linha 3 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Segmento"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.segmento}
                                name="segmento"
                                // error={!!touched.segmento && !!errors.segmento} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.segmento && errors.segmento}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email Empresarial"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.email_empresarial}
                                name="email_empresarial"
                                // error={!!touched.email_empresarial && !!errors.email_empresarial} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.email_empresarial && errors.email_empresarial}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>

                        <Box
                            display="grid"
                            gap="30px"
                            m="10px 0 0 0"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                                border: 1,
                                padding: 2,
                                borderColor: 'primary.100',
                            }}
                        >
                            <Typography sx={{ gridColumn: "span 8" }}>
                                Endereço:
                            </Typography>
                            {/* Linha 1 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="CEP"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={numberMask(values.cep)}
                                name="cep"
                                // error={!!touched.cep && !!errors.cep} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.cep && errors.cep}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Endereço"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={(values.endereco)}
                                name="endereco"
                                // error={!!touched.endereco && !!errors.endereco} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.endereco && errors.endereco}
                                sx={{ gridColumn: "span 6" }}
                            />

                            {/* Linha 2 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Número"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={numberMask(values.numero)}
                                name="numero"
                                // error={!!touched.numero && !!errors.numero} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.numero && errors.numero}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Bairro"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.bairro}
                                name="bairro"
                                // error={!!touched.bairro && !!errors.bairro} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.bairro && errors.bairro}
                                sx={{ gridColumn: "span 6" }}
                            />
                            {/* Linha 3 */}

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Cidade"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values}
                                name="cidade"
                                // error={!!touched.cidade && !!errors.cidade} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.cidade && errors.cidade}
                                sx={{ gridColumn: "span 6" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="UF"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={(values.uf)}
                                inputProps={{ maxLength: "2" }}
                                name="uf"
                                // error={!!touched.uf && !!errors.uf} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.uf && errors.uf}
                                sx={{ gridColumn: "span 2" }}
                            />

                        </Box>

                    </Box>
                )
                }

                {!page2 ? null : (
                    <Box>
                        <Box
                            display="grid"
                            gap="30px"
                            m="10px 0 0 0"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                                border: 1,
                                padding: 2,
                                borderColor: 'primary.100',
                            }}
                        >
                            <Typography sx={{ gridColumn: "span 8" }}>
                                Contato:
                            </Typography>
                            {/* Linha 1 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Responsável da Empresa"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={(values.resp_empresa)}
                                name="resp_empresa"
                                // error={!!touched.resp_empresa && !!errors.resp_empresa} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.resp_empresa && errors.resp_empresa}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Telefone"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={phoneMask(values.telefone)}
                                inputProps={{ maxLength: "15" }}
                                name="telefone"
                                // error={!!touched.telefone && !!errors.telefone} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.telefone && errors.telefone}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="WhatsApp"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={phoneMask(values.whatsapp)}
                                inputProps={{ maxLength: "15" }}
                                name="whatsapp"
                                // error={!!touched.whatsapp && !!errors.whatsapp} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.whatsapp && errors.whatsapp}
                                sx={{ gridColumn: "span 2" }}
                            />


                            {/* Linha 2 */}

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.email}
                                name="email"
                                // error={!!touched.email && !!errors.email} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Contador"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={(values.contador)}
                                name="contador"
                                // error={!!touched.contador && !!errors.contador} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.contador && errors.contador}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Linha 3 */}
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="CEP"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={numberMask(values.cep_emp)}
                                name="cep_emp"
                                // error={!!touched.cep_emp && !!errors.cep_emp} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.cep_emp && errors.cep_emp}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Endereço"
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={values.endereco_emp}
                                name="endereco_emp"
                                // error={!!touched.endereco_emp && !!errors.endereco_emp} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.endereco_emp && errors.endereco_emp}
                                sx={{ gridColumn: "span 6" }}
                            />

                            {/* Linha 4 */}

                        </Box>
                    </Box>)
                }

                {!page3 ? null : (
                    <Box>
                        <Box
                            display="grid"
                            gap="30px"
                            m="10px 0 0 0"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
                                border: 1,
                                padding: 2,
                                borderColor: 'primary.100',
                            }}
                        >
                            <Typography sx={{ gridColumn: "span 8" }}>
                                Implantação:
                            </Typography>
                            {/* Linha 1 */}

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Observação"
                                // onBlur={handleBlur}
                                // onChange={(event) => {
                                //     console.log(event)
                                //     const { name, value } = event.target;
                                //     // Atualiza o valor do campo "mensal"
                                //     const percentual = (parseFloat(value) / 1200) * 100;
                                //     values.mensal = value;
                                //     values.percentual = String (percentual);
                                // }}
                                // onChange={handleChange}
                                // value={floatMask(values.mensal)}
                                name="mensal"
                                // error={!!touched.mensal && !!errors.mensal} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.mensal && errors.mensal}
                                sx={{ gridColumn: "span 3" }}
                            />

                            {/* Linha 2 */}

                            {/* Linha 3 */}

                            <TextField
                                fullWidth
                                variant="filled"
                                type="date"
                                label="Última Alteração"
                                focused
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={(values.data_v)}
                                name="data_v"
                                // error={!!touched.data_v && !!errors.data_v} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.data_v && errors.data_v}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="checkbox"
                                label="Bloqueado"
                                focused
                                // onBlur={handleBlur}
                                // onChange={handleChange}
                                // value={(values.data_f)}
                                name="data_f"
                                // error={!!touched.data_f && !!errors.data_f} //Se o campo for tocado e houver problema no preenchimento, vai mostrar o erro embaixo
                                // helperText={touched.data_f && errors.data_f}
                                sx={{ gridColumn: "span 4" }}
                            />

                        </Box>

                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
                        >
                            <Box sx={{ gridColumn: "span 7", }}
                            />
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={handleFormSubmit}
                                sx={{
                                    gridColumn: "span 1",
                                    width: "100%",
                                    marginTop: "10px",
                                }}
                            >
                                CADASTRAR
                            </Button>
                        </Box>

                    </Box>
                )
                }

                {/* </form> */}
                {/* )} */}
                {/* </Formik> */}
            </form>

        </Box >
    );
}

export default CadastroPagina_2;