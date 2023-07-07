import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CadastroProduto from '../pages/CadastroProduto';
import Redirector from '../pages/Redirector';
import CriarEmpresa from '../pages/CadastroEmpresa';

export function StackAuth() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CriarEmpresa />} />
            <Route path="/*" element={<Redirector />} />
        </Routes>
    )
}