import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material";
import Sidebar from '../pages/Global/Sidebar';
import Topbar from '../pages/Global/Topbar';
import { ProSidebarProvider } from 'react-pro-sidebar';

import Dashboard from '../pages/Dashboard';
import UpdateAccount from '../pages/EditarConta';
import Redirector from '../pages/Redirector';
import Pagina_1 from '../pages/Pagina_1';
import Pagina_2 from '../pages/Pagina_2';
import Pagina_3 from '../pages/Pagina_3';
import Pagina_4 from '../pages/Pagina_4';
import Pagina_5 from '../pages/Pagina_5';

import CadastroPagina_1 from '../pages/CadastroPagina_1';
import CadastroPagina_2 from '../pages/CadastroPagina_2';
import CadastroPagina_3 from '../pages/CadastroPagina_3';
import CadastroPagina_4 from '../pages/CadastroPagina_4';
import CadastroPagina_5 from '../pages/CadastroPagina_5';

import EditarPagina_1 from '../pages/EditarPagina_1';
import EditarPagina_2 from '../pages/EditarPagina_2';
import EditarPagina_3 from '../pages/EditarPagina_3';
import EditarPagina_4 from '../pages/EditarPagina_4';
import EditarPagina_5 from '../pages/EditarPagina_5';

import { dashboardTheme } from '../typo';

export function StackRoutes() {
    const theme = dashboardTheme;

    return (
        <>
            <ThemeProvider theme={theme}>
                <ProSidebarProvider>
                    <Topbar />
                    <div className="app">
                        <div>
                            <Sidebar />
                        </div>
                        <main className="content" style={{ width: "100%" }}>
                            <div style={{ flex: 1 }}>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/minhaconta" element={<UpdateAccount />} />

                                    <Route path="/itens" element={<Pagina_1 />} />
                                    <Route path="/itens/cadastrar" element={<CadastroPagina_1 />} />
                                    <Route path="/itens/editar/:id" element={<EditarPagina_1 />} />

                                    <Route path="/lojas" element={<Pagina_2 />} />
                                    <Route path="/lojas/cadastrar" element={<CadastroPagina_2 />} />
                                    <Route path="/lojas/editar/:id" element={<EditarPagina_2 />} />

                                    <Route path="/estoques" element={<Pagina_3 />} />
                                    <Route path="/estoques/cadastrar" element={<CadastroPagina_3 />} />
                                    <Route path="/estoques/editar/:id/" element={<EditarPagina_3 />} />

                                    <Route path="cidades" element={<Pagina_4 />} />
                                    <Route path="cidades/cadastrar" element={<CadastroPagina_4 />} />
                                    <Route path="cidades/editar/:id" element={<EditarPagina_4 />} />

                                    <Route path="/categorias" element={<Pagina_5 />} />
                                    <Route path="/categorias/cadastrar" element={<CadastroPagina_5 />} />
                                    <Route path="/categorias/editar/:id" element={<EditarPagina_5 />} />

                                    <Route path="/*" element={<Redirector />} />
                                </Routes>
                            </div>
                        </main>
                    </div>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}