import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Topo from "../components/Topo";

export default function AccommodationPage(){
    const { idCidade } = useParams();
    const [accommodation, setAccommodation] = useState([])

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState();
    const [maxValueInitial, setMaxValueInitial] = useState();
    const [notFound, setNotFound] = useState(false)

    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/cities/accommodation/${idCidade}`)
            .then(e => {
                setAccommodation(e.data)
                const maxPrice = Math.max(...e.data.map((accommodation) => accommodation.price));
                setMaxValueInitial(maxPrice/100);
                setMaxValue(maxPrice/100)
                console.log(e.data)
                if(e.data.length === 0){
                    console.log("chega aqui")
                    setNotFound(true)
                }
            })
            .catch(e => console.log(e))
        
    },[])

    function seeDetails(id){
        console.log(id)
        navigate("/hospedagens/detalhes/"+id)
    }

    function handleMinValueChange(event) {
        setMinValue(event.target.value);
      }
    
      function handleMaxValueChange(event) {
        setMaxValue(event.target.value);
      }
      const filteredAccommodation = accommodation.filter((accommodation) => {
        const price = accommodation.price / 100;
        return price >= minValue && price <= maxValue;
      });
    
      if(!notFound && accommodation.length===0){
        return (<>
            <Topo/>
            Carregando...
        </>)
      }

    return(
        <>
        <Topo/>
        {notFound?<>Não há hoteis cadastrados para esta cidade</>:
        <ContainerPage>
            <Filter>
            <h2>Filtros</h2>
          <div>
            <label htmlFor="minValue">Preço Mínimo:</label>
            <input
              type="range"
              id="minValue"
              min="0"
              max={maxValue}
              value={minValue}
              onChange={handleMinValueChange}
            />
            <span>{minValue}</span>
          </div>
          <div>
            <label htmlFor="maxValue">Preço Máximo:</label>
            <input
              type="range"
              id="maxValue"
              min={minValue}
              max={maxValueInitial}
              value={maxValue}
              onChange={handleMaxValueChange}
            />
            <span>{maxValue}</span>
          </div>
            </Filter>
            <TicketsArea>
                <h1>Hospedagens em {accommodation[0].city_name}</h1>
                
                <ContainerTickets>
                    {filteredAccommodation.map((a)=>(
                        <Tickets key={a.id} onClick={()=>seeDetails(a.id)}>
                            <img src={a.images[0]}/>
                            <p>{a.name}</p>
                            <p>R$ {a.price /100},00</p>
                        </Tickets>
                    ))}
                    
                </ContainerTickets>
            </TicketsArea>
        </ContainerPage>}
        </>
    )
}

const ContainerPage = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    background-image: url("https://www.melhoresdestinos.com.br/wp-content/uploads/2021/02/club-med-rio-das-pedras-4.jpg");
    background-size: cover;
    background-repeat: no-repeat;
`
const ContainerTickets = styled.div`
    padding-left: 50px;
    display: flex;
    flex-wrap: wrap;
`

const Filter = styled.div`
    width: 300px;
    height: calc(100vh - 70px);
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 80%;
    h2, label, span{
      font-weight: 600;
      font-size: 18px;
      margin-bottom: 15px;
    }
    input{
        width: 200px;
        margin-bottom: 15px;
    }
    input[type=range]{
      -webkit-appearance: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
      width: 300px;
      height: 5px;
      background: #50c8c6;
      border: none;
      border-radius: 3px;
  }

  input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: black;
      margin-top: -4px;
  }

`
const TicketsArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 300px);
    h1{
      margin-top: 30px;
        font-size: 50px;
        color: #fff;
        font-weight: 600;
    }
`

const Tickets = styled.div`
    width: 250px;
    height: 300px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    margin-right: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    background-color: #fff;
    opacity: 80%;
    p{
        font-size: 25px;
        font-weight: 600;
    }
    img{
        width: 170px;
        height: 120px;
    }
`