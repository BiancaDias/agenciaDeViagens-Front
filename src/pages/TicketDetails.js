import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Topo from "../components/Topo";

export default function TicketDetails(){
    const { idPassagem } = useParams();
    const [ticket, setTicket] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log("teste")
        axios.get(`${process.env.REACT_APP_API_URL}/ticket/${idPassagem}`)
            .then(e =>{
                 console.log(e.data)
                 setTicket(e.data)
                })
            .catch(e => alert(e))
    }, [])
    if(ticket.length === 0){
        return(
            <>
                <Topo/>
                <Loading>Carregando...</Loading>
            </>
        )
    }

    function seeAccommodations(){
        navigate("/hospedagens/"+ticket.city_dest)
    }
    return(
        <>
            <Topo/>
            <ContainerTicket>
                <h1>Passagem para {ticket.city_dest_name}</h1>
                <ContainerDetails>
                    <p>Cidade de Destino: {ticket.city_dest_name}</p>
                    <p>Cidade de Origem: {ticket.city_orig}</p>
                    <p>Companhia Aérea: {ticket.cia_name}</p>
                    <p>Horário de Partida: {ticket.time_orig.slice(0,5)}</p>
                    <p>Previsão de Chegada: {ticket.time_dest.slice(0,5)}</p>
                    <p>Valor com Desconto Viagens Alucinantes: R$ {ticket.price / 100},00 </p>
                </ContainerDetails>
                <button onClick={seeAccommodations}>Ver opções de hospedagens</button>
            </ContainerTicket>
        </>
    )
}
const Loading = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 70px);
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight:600;
`
const ContainerTicket = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    h1{
        font-size: 30px;
        font-weight: 600;
        margin-top: 30px;
    }
    button{
        border: #fff;
        cursor: pointer;
        background-color: #50c8c6;
        font-weight: 600;
        width: 200px;
        height: 100px;
        font-size: 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        margin-top: 30px;
    }
`

const ContainerDetails = styled.div`
    margin-top: 30px;
    font-size: 20px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 15px;
    font-weight: 500;
    border-radius: 15px; 
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

`