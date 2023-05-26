import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

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
        return <>Carregando</>
    }

    function seeAccommodations(){
        navigate("/hospedagens/"+ticket.city_dest)
    }
    return(
        <ContainerTicket>
            <h1>Passagem para {ticket.city_dest_name}</h1>
            <ContainerDetails>
                <p>Cidade de Destino: {ticket.city_dest_name}</p>
                <p>Cidade de Origem: {ticket.city_orig}</p>
                <p>Companhia Aérea: {ticket.cia_name}</p>
                <p>Horário de Partida: {ticket.time_orig}</p>
                <p>Previsão de Chegada: {ticket.time_dest}</p>
                <p>Valor com Desconto Viagens Alucinantes: R$ {ticket.price / 100} </p>
            </ContainerDetails>
            <button onClick={seeAccommodations}>Ver opções de hospedagens</button>
        </ContainerTicket>
    )
}

const ContainerTicket = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContainerDetails = styled.div`

`