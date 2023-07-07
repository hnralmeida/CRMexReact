import { Typography, Box } from "@mui/material";

interface Props {
    title: string;
    subtitle: string;
    color?: string;
}

const Header = ({ title, subtitle, color }: Props) => {
    return (
        <Box mb="30px">
            <Typography
                variant="h2"
                color={color || "primary"}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" color={"secondary.light"}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;