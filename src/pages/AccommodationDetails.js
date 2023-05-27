import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import Topo from "../components/Topo";

export default function AccommodationDetails(){
    const { idHospedagem } = useParams();
    const [accommodation, setAccommodation ] = useState([])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/accommodation/${idHospedagem}`)
            .then((e) =>{
                console.log(e.data[0])
                setAccommodation(e.data[0])
            })
            .catch(e => alert(e))
    },[])


    if(accommodation.length === 0){
        return <>Carregando</>
    }
    return (
        <>
            <Topo/>
            <ContainerDetails>
                <h1>{accommodation.name}</h1>
                <ContainerImages>
                    {accommodation.images.map((i) => (
                        <img src={i} key={i} />
                    ))}
                </ContainerImages>
                <Details>
                    <Characteristics>
                        <p>Caracteristicas</p>
                        <p>Descrição: {accommodation.description}</p>
                        <p>Local: {accommodation.city_name}</p>
                        <p>Valor: {accommodation.price/100} a diaria</p>
                    </Characteristics>
                    <Conveniences>
                        {accommodation.conveniences.map((c)=>(
                            <p>{c}</p>
                        ))}
                    </Conveniences>
                </Details>
            </ContainerDetails>
        </>
    )
    
}

const ContainerDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ContainerImages = styled.div`
    display: flex;
    img{
        width: 300px;
    }
`

const Details = styled.div`
    display: flex;
`

const Characteristics = styled.div`
    display: flex;
    flex-direction: column;
`
const Conveniences = styled.div`
    display: flex;
    flex-direction: column;
`