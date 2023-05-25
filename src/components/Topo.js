import { styled } from "styled-components"

export default function Topo(){
    return(
        <Container>
            <h1>Viagens Alucinantes</h1>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: red;
    display: flex;
    align-items: center;
    h1{
        margin-left: 60px;
        font-size: 30px;
        font-weight: 700;
    }
`