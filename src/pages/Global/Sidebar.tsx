import { useState, useEffect } from 'react';
import { Sidebar as ProSidebar, useProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaymentIcon from '@mui/icons-material/Payment';
import { useAuth } from '../../contexts/authProvider';

function Sidebar() {
    const [selected, setSelected] = useState("Dashboard");
    const { collapseSidebar } = useProSidebar();
    const { authData } = useAuth();

    useEffect(() => {
        if (window.innerWidth < 400) {
            collapseSidebar();
        }

    }, []);

    function Item({ title, to, icon, selected, setSelected }: any) {
        return (
            <Link to={to}>
                <MenuItem
                    active={selected === title}
                    style={{ color: "white" }}
                    onClick={() => setSelected(title)}
                    icon={icon}
                >
                    <Typography>{title}</Typography>
                </MenuItem>
            </Link>
        );
    }

    return (

        <Box
            flex={1}
            flexDirection={"row"}
        >
            <ProSidebar breakPoint="sm"
                transitionDuration={800}
                backgroundColor="rgb(229, 68, 00)"
                rtl={false}
                style={{ height: "92vh" }}
            >
                {/* {!broken && ( */}
                <Menu
                    menuItemStyles={{
                        button: () => {
                            return {
                                ":hover": {
                                    color: "#1A2254 !important",
                                }
                            };
                        },
                    }}
                >
                    <MenuItem
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        rootStyles={{
                            color: "white",
                        }}
                    >
                        <Typography
                            variant="h6"
                        >
                            Bem - vindo, {authData?.razao_social}
                        </Typography>
                    </MenuItem>

                    <Item
                        icon={<HomeOutlinedIcon />}
                        title="Dashboard"
                        to="/dashboard"
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Item
                        icon={<PeopleOutlinedIcon />}
                        title="Itens"
                        to="/itens"
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Item
                        icon={<ContactsOutlinedIcon />}
                        title="Lojas"
                        to="/lojas"
                        selected={selected}
                        setSelected={setSelected}

                    />
                    <Item
                        icon={<AttachMoneyIcon />}
                        title="Estoques"
                        to="/estoques"
                        selected={selected}
                        setSelected={setSelected}

                    />
                    <Item
                        icon={<PaymentIcon />}
                        title="Cidades"
                        to="/cidades"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        icon={<InventoryIcon />}
                        title="Categorias"
                        to="/categorias"
                        selected={selected}
                        setSelected={setSelected}
                    />

                </Menu>
            </ProSidebar>
        </Box >
    )
}

export default (Sidebar);