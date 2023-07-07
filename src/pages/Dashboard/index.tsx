import { Box } from "@mui/material";
import Header from "../../components/Header";
import React from "react";
import ENV from "../../../env";

function Login() {

    const [urlSrc, setUrlSrc] = React.useState("");

    React.useEffect(() => {

        const url = ENV.BASE_URL;
        console.log(url);
        const imageUrl = './src/assets/imgt.webp';

        fetch(imageUrl).then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Não foi possível obter a imagem.');
        }).then(blob => {
            const img = URL.createObjectURL(blob)
            setUrlSrc(img);
        }).catch(error => {
            console.error(error);
        });
    }, []);


    return (
        <>
            <Header title="Dashboard" subtitle="Página Inicial" />
            
            <Box display="flex" justifyContent="center">
                <Box component="img" src={urlSrc} height="500px" sx={{
                    mixBlendMode: 'multiply',
                }}
                />
            </Box>

        </>
    )
}

export default Login