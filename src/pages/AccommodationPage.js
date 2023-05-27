import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Topo from "../components/Topo";

export default function AccommodationPage(){
    const { idCidade } = useParams();
    const [accommodation, setAccommodation] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/cities/accommodation/${idCidade}`)
            .then(e => {
                console.log(e.data)
                setAccommodation(e.data)
            })
            .catch(e => console.log(e))
    },[])

    function seeDetails(id){
        console.log(id)
        navigate("/hospedagens/detalhes/"+id)
    }

    return(
        <>
        <Topo/>
        <ContainerPage>
            <Filter>
                
            </Filter>
            <TicketsArea>
                <h1>Hospedagens em </h1>
                
                <ContainerTickets>
                    {accommodation.map((a)=>(
                        <Tickets onClick={()=>seeDetails(a.id)}>
                            <img src={a.images[0]}/>
                            <p>{a.name}</p>
                            <p>R$ {a.price /100},00</p>
                        </Tickets>
                    ))}
                    
                </ContainerTickets>
            </TicketsArea>
        </ContainerPage>
        </>
    )
}

const ContainerPage = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
`

const ContainerTickets = styled.div`
    padding-left: 50px;
    display: flex;
    flex-wrap: wrap;
`

const Filter = styled.div`
    width: 300px;
    height: calc(100vh - 70px);
    background-color: blue;
`
const TicketsArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 300px);
    h1{
        font-size: 50px;
    }
`

const Tickets = styled.div`
    width: 250px;
    height: 300px;
    background-color: pink;
    margin-right: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p{
        font-size: 20px;
        font-weight: 600;
    }
    img{
        width: 250px;
    }
`