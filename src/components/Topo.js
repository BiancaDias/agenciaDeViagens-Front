import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"


export default function Topo(){
    const navigate = useNavigate()
    function goToHomePage(){
        navigate("/")
    }

    function goBack(){
        navigate(-1)
    }
    return(
        <Container>
            <LogoContainer>
                <h1 onClick={goToHomePage}>Viagens Relaxantes</h1>
                <img alt="logo" src="https://cdn.icon-icons.com/icons2/1898/PNG/512/flight_121043.png"/>
            </LogoContainer>
            <button onClick={goBack}>Voltar</button>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: #50c8c6;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    justify-content: space-between;
    
    button{
        background-color: #50c8c6;
        border: none;
        font-weight: 600;
        font-size: 20px;
        margin-right: 60px;
        cursor: pointer;
        width: 100px;
        height: 30px;
        border-radius:10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
`

const LogoContainer = styled.div`
    display: flex;
    h1{
        margin-left: 60px;
        font-size: 30px;
        font-weight: 700;
        cursor: pointer;
    }
    img{
        width: 30px;
        height: 30px;
        margin-left:10px ;
    }
`