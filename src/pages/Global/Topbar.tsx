import { Box } from "@mui/material";
import IconSettings from "../../components/IconSettings";
// import IconNotification from "../../components/IconNotification";
import Logo from "../../assets/Logo_transp.png";

function Topbar() {

    return (
        <Box
            display="flex"
            bgcolor="rgb(229, 68, 00)"
            justifyContent="space-between"
            alignContent="space-around"
            width='100vw'
            height='8vh'
            p="0"
            m="0"
        >

            <Box
                width="10vw"
                m="1vh"
            >
                <img src={Logo} height="100%" />
            </Box>


            {/* Searchbar */}

            <Box
                display="inline"
                bgcolor="#ffffff"
                borderRadius="3px"
            >
            </Box>

            {/* Buttons */}
            <Box
                justifyContent="space-between"
                p="1vh"
                m="0"
            >
                <IconSettings />
            </Box>

        </Box >
    );

}

export default Topbar;