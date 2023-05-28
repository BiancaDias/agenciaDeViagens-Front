import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Topo from "../components/Topo";

export default function TicketsPage() {
  const { idCidade } = useParams();
  const [tickets, setTickets] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState();
  const [maxValueInitial, setMaxValueInitial] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cities/ticket/${idCidade}`)
      .then((response) => {
        const data = response.data;
        setTickets(data);
        const maxPrice = Math.max(...data.map((ticket) => ticket.price));
        setMaxValueInitial(maxPrice/100);
        setMaxValue(maxPrice/100);
        console.log(response.data)
      })
      .catch((error) => console.log(error));
  }, []);

  function seeDetails(id) {
    console.log(id);
    navigate("/passagens/detalhes/" + id);
  }

  function handleMinValueChange(event) {
    setMinValue(event.target.value);
  }

  function handleMaxValueChange(event) {
    setMaxValue(event.target.value);
  }
  const filteredTickets = tickets.filter((ticket) => {
    const price = ticket.price / 100;
    return price >= minValue && price <= maxValue;
  });

  if(tickets.length === 0){
    return <>Carregando...</>
  }

  return (
    <>
      <Topo />
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
          <h1>Passagens para {tickets[0].city_dest_name}</h1>

          <ContainerTickets>
            {filteredTickets.map((t) => (
              <Tickets key={t.id} onClick={() => seeDetails(t.id)}>
                <img src={t.logo} alt="Logo" />
                <p>10/06 - {t.time_orig}</p>
                <p>R$ {t.price / 100},00</p>
                <p>{t.city_orig}</p>
              </Tickets>
            ))}
          </ContainerTickets>
        </TicketsArea>
      </ContainerPage>
    </>
  );
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
    input{
        width: 200px;
    }
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
        height: 120px;
    }
`