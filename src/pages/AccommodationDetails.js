import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import Topo from "../components/Topo";
import  Carousel  from "../components/Carousel";


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
                <Carousel images={accommodation.images}/>
                <Details>
                    <Characteristics>
                        <h2>Caracteristicas</h2>
                        <p>Descrição: {accommodation.description}</p>
                        <p>Local: {accommodation.city_name}</p>
                        <p>Valor: R$ {accommodation.price/100},00 a diaria</p>
                    </Characteristics>
                    <Conveniences>
                        <h2>Comodidades exclusivas</h2>
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
    h1{
        font-size: 30px;
        font-weight: 600;
        margin: 40px;
    }
`


const Details = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-between;
    p{
        margin-top: 15px;
    }
    h2{
        font-size: 25px;
        font-weight: 500;
        margin-top: 30px;
    }
`

const Characteristics = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-right: 30px;
`
const Conveniences = styled.div`
    display: flex;
    flex-direction: column;
`

