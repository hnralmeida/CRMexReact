import { Box } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router";
import { useEffect } from 'react';

export default function Redirector() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 500);
    }, []);
    
    return (
        <Box>
            <Box>
                <CircularProgress sx={{margin: '45vh 45vw'}}/>
            </Box>
        </Box>
    )
}