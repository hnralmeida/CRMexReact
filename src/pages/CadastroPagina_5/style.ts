import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #FFFFFF;
  height: 100vh;
  // margin-top: 230px;

  @media (max-width: 800px) {
    div {
    align-items: center;
    }
  }
`

export const Content = styled.div`
  display: flex;
  // background-color: black;
  flex-direction: row;
  margin-top: 85px;
  margin-bottom: 10px;
  align-items: center;
  margin-right: 18px;
  margin-left: 18px;
  padding: 0px 20px;
  
  @media (max-width: 800px) {
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
 }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

  input {
    // width: 250px;
    // height: 30px;
    // background-color: #092458;
    // border: 2px solid #fff;
    // margin-bottom: 30px;
    // border-radius: 10px;
    color: #fff;
    // font-size: 20px;
    // margin-left: 80px;
    

  //   @media (max-width: 800px) {
  //     width: 210px;
  //     height: 40px;
  //     padding: 0px;
  //     margin: 0px;
  //     margin-bottom: 30px;
   
  //  }
  // }

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
    background-color:red;


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
  width: 310px;
  height: 50px;
  @media (max-width: 800px) {
    margin: 0px;
   }
}

p {
  color: white;
  font-weight: bold;
  font-size: 15px;
}

a { 
  display: flex;
  flex-direction: row;
  color: #fff;
  opacity: 0.3;
  font-size: 15px;
  text-decoration: none;
  align-items: center;

  @media (max-width: 800px) {
    align-items: center;
  }

}

a:hover {
  opacity: 1;
}

.link1 {
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 15px;
  }
}

.link2 {
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 15px;
  }
}

.links {
  display: flex;
  justify-content: space-evenly;
  // margin-left: 80px;

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
  button {
    width: 310px;
    height: 50px;
    border: 2px solid #fff;
    border-radius: 10px;
    color: #FFFFFF;
    font-weight: bold;
    

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
    z-index: -1;
    transition: .7s ease;
    cursor: pointer;
  }
`