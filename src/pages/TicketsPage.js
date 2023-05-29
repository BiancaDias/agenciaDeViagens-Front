import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Topo from "../components/Topo";
import dayjs from "dayjs";

export default function TicketsPage() {
  const { idCidade } = useParams();
  const [tickets, setTickets] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState();
  const [maxValueInitial, setMaxValueInitial] = useState();
  const navigate = useNavigate();
  const [date, setDate ] = useState()
  const day = dayjs();

  useEffect(() => {
    const nextDay = day.add(1, 'day').format('DD/MM')
    setDate(nextDay)
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
                <p>{date} - {t.time_orig.slice(0,5)}</p>
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
    background-image: url("https://ceabbrasil.com.br/blog/wp-content/uploads/2022/05/Design-sem-nome.jpg");
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
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
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
        font-size: 20px;
        font-weight: 600;
    }
    img{
        width: 150px;
        height: 100px;
    }
`