import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material";
import Sidebar from '../pages/Global/Sidebar';
import Topbar from '../pages/Global/Topbar';
import { ProSidebarProvider } from 'react-pro-sidebar';

import Dashboard from '../pages/Dashboard';
import Clientes from '../pages/Clientes';
import CadastroClientes from '../pages/CadastroClientes';
import Vendedores from '../pages/Vendedor';

import CadastroProduto from '../pages/CadastroProduto';
import Produto from '../pages/Produto';
import EditarProduto from '../pages/EditarProduto';
import UpdateEmpresa from '../pages/EditarEmpresa';

import { dashboardTheme } from '../typo';
import Redirector from '../pages/Redirector';
import CadastroVendedor from '../pages/CadastroVendedor';
import EditarVendedor from '../pages/EditarVendedor';

import CadastroFormaPgto from '../pages/CadastroFormaPgto';
import FormaPgto from '../pages/FormaPgto';
import EditarFormapgto from '../pages/EditarFormapgto';
import EditarCliente from '../pages/EditarCliente';

import Percelas from '../pages/Parcelas';
import CadastroPercelas from '../pages/CadastroPacelas';


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
                                    <Route path="/clientes" element={<Clientes />} />
                                    <Route path="/cadastrar" element={<CadastroClientes />} />
                                    <Route path="/vendedor" element={<Vendedores />} />
                                    <Route path="/vendedor/cadastrar" element={<CadastroVendedor/>} />
                                    <Route path="/vendedor/editar/:id" element={<EditarVendedor />} />
                                    <Route path="/clientes/editar/:id" element={<EditarCliente />} />
                                    <Route path="/produtos" element={<Produto />} />
                                    <Route path="/minhaempresa" element={<UpdateEmpresa />} />
                                    <Route path="/cadastrar/produto" element={<CadastroProduto />} />
                                    <Route path="/produtos/editar/:id" element={<EditarProduto />} />
                                    <Route path="/pagamento" element={<FormaPgto />} />
                                    <Route path="/pagamento/cadastrar" element={<CadastroFormaPgto />} />
                                    <Route path="/pagamentos/editar/:id/" element={<EditarFormapgto/>}/>
                                    <Route path="/parcelas" element={<Percelas />} />
                                    <Route path="/parcelas/cadastrar" element={<CadastroPercelas />} />
                                    <Route path="/parcelas/editar/:id" element={<Percelas />} />
                                    
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