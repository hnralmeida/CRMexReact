import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Redirector from '../pages/Redirector';
import CriarUsuario from '../pages/CadastroUsuario';

export function StackAuth() {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CriarUsuario />} />
            <Route path="/*" element={<Redirector />} />
        </Routes>
    )
}