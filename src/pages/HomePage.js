import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"

export default function HomePage() {
    const navigate = useNavigate();
    const [cities, setCities] = useState();
    const [idCity, setIdCity] = useState();
    const [search, setSearch] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/cities`)
            .then(e => setCities(e.data))
            .catch(e => console.log(e))

    }, [search])
    function handleSearch(event){
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);

        const filtered = cities.filter((city) =>
            city.name.toLowerCase().includes(searchValue)
        );
        setFilteredCities(filtered);
    };
    function seeTickets(e){
        e.preventDefault();
        //ver caso depois em que idCity === null
        navigate("/passagens/"+idCity)
    }
    function handleClickCity(id, name){
        // Executar ação com o ID da cidade clicada
        console.log('ID da cidade:', id);
        setIdCity(id);    
        setSearch(name)   
      };

    return (
        <HomeContainer>
            <ContainerInput onSubmit={seeTickets}>
                <input
                    type="text"
                    id="search_input"
                    value={search}
                    onChange={handleSearch}
                />
                <ul>
                    {filteredCities.map((city) => (
                    <li
                        key={city.id}
                        onClick={() => handleClickCity(city.id,city.name)}
                    >
                        {city.name}
                    </li>
                    ))}
                </ul>
                <button>Ver Passagens</button>
            </ContainerInput>

            <ApresentacaoContainer>
                <CaixaApresentacao>
                    <p>1- Escolha a cidade que deseja visitar</p>
                </CaixaApresentacao>
                <CaixaApresentacao>
                    <p>2- Veja as passagens disponíveis, com preços e datas</p>
                </CaixaApresentacao>
                <CaixaApresentacao>
                    <p>3- Veja os locais onde você pode se hospedar e todo o conforto que eles oferecem!</p>
                </CaixaApresentacao>
            </ApresentacaoContainer>
        </HomeContainer>
    )
}
const ContainerInput = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        width: 70%;
        height: 50px;
    }
    ul{
        width: 70%;
    }
`
const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: calc(100vh - 70px);
    
`

const ApresentacaoContainer = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-between;

`

const CaixaApresentacao = styled.div`
    border: 1px solid black;
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
`