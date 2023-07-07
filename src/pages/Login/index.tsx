import * as S from './styles';
import Logo from '../../assets/Logo_noText.png';
import { useAuth } from '../../contexts/authProvider'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Login() {

    const { signIn, isLoading } = useAuth();
    const [user, setUser] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    function handleSignIn() {

        if (user === '' || pw === '') {
            alert('Falha no Login: Digite usuário e Senha.');
        } else {
            signIn(user, pw)
                .then((response) => {
                    console.log('Signin: ' + response);
                })
        }

    }

    return (
        <S.Container className="App">
            <S.Content id="home">
                <S.Logo>
                    <S.LogoHand src={Logo} alt="Logo"/>
                    {/* <img src={Logo} alt="Logo"/> */}
                </S.Logo>
                <S.Line />
                <div className='bloco2'>
                    <form action="">
                        <input
                            placeholder="Email"
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </form>
                    <form action="">
                        <input
                            placeholder="Senha"
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        >
                        </input>
                    </form>
                    <S.Button
                    >
                        {isLoading ? (
                            <button className='lockButton'
                                onClick={handleSignIn}
                                disabled
                            >
                                ...
                            </button>
                        ) : (
                            <button
                                onClick={handleSignIn}
                            >
                                ENTRAR
                            </button>
                        )}
                    </S.Button>
                    <S.Links>
                        <div className='links'>
                            <Button
                                href="#text-buttons"
                                onClick={() => navigate('/forgot')}
                            >
                                Esqueceu a senha?
                            </Button>
                            <Button
                                href="#text-buttons"
                                onClick={() => navigate('/register')}
                            >
                                Criar Nova Conta
                            </Button>
                        </div>
                    </S.Links>
                </div>
            </S.Content>
        </S.Container>
    )
}

export default Login