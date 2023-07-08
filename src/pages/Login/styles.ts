import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  background: no-repeat center, linear-gradient(to bottom, GRAY, BLACK);
  height: 100vh;
  width: 100vw;
  // margin-top: 230px;

  @media (max-width: 800px) {
    div {
    align-items: center;
    }
  }
`
export const LogoHand = styled.img`
 background-blend-mode: multiply;
`

export const FormLogin = styled.div`
  align-items: center
`
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-top: 85px;
  margin-bottom: 10px;
  
  @media (max-width: 800px) {
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
  }

  input {
    width: 75%;
    height: 50px;
    margin: 0 10%;
    background-color: #000;
    border: 2px solid #fff;
    margin-bottom: 30px;
    border-radius: 10px;
    color: #ffffaa;
    padding-left: 15px;
    font-size: 20px;

    @media (max-width: 800px) {
      width: 210px;
      height: 40px;
      padding: 0px;
      margin: 0px;
      margin-bottom: 30px;
   }
  }

  input:focus {
   border: 2px solid #fff;
   outline: none;
  }

  input::placeholder {
    color: #fff;
    opacity: 0.2;
    padding-left: 15px;
    font-size: 18px;
  }

  .bloco2 {
    width: 50%;

    @media (max-width: 800px) {
      margin: 0px;
      padding: 0px;
      display: flex;
      flex-direction: column;
   }
  }

`

export const Logo = styled.div`
  img {
    width: 300px;
    margin-right: 80px;
    background-blend-mode: multiply;
  }

  @media (max-width: 800px) {
    img {
      width: 230px;
      margin-right: 0px;
      margin-bottom: 50px;
    };
  }
`

export const Links = styled.div`
@media (max-width: 800px) {
  // margin: 0px;
 }

div {
  display: flex;
  // background-color: black;
  margin: 0px;
  width: 400px;
  height: 50px;
  @media (max-width: 800px) {
    margin: 0px;
   }
}

a:hover {
  opacity: 1;
}

.links {
  display: flex;
  justify-content: space-evenly;
  color: black;

  @media (max-width: 800px) {
    margin-left: 0px;
  }
}
`

export const Line = styled.div`
  height: 350px;
  border-right: 2px solid white;
  opacity: 0.2;

  @media (max-width: 800px) {
    {
      border-right: 2px solid red;
      height: 0px;
    }
    
  }
 }
`

export const Button = styled.div`

  display: flex;
  justify-content: center;

  button {
    width: 50%;
    height: 50px;
    border: 2px solid #fff;
    border-radius: 10px;
    color: ##ffffaa;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 30px;

    @media (max-width: 800px) {
      width: 220px;
      height: 40px;
      margin: 0px;
      justify-content: center;
      align-items: center;
   }
  }

  button:hover{
    background-color: transparent;
    color : #fff;
    transition: .7s ease;
  }

  .lockButton {
    background-color:transparent;
    color : #fff;
    cursor: wait;
  }

  .lockButton:hover {
    background-color:transparent;
  }
`
