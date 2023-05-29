import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import Topo from "../components/Topo";

export default function HomePage() {
    const navigate = useNavigate();
    const [cities, setCities] = useState();
    const [idCity, setIdCity] = useState();
    const [search, setSearch] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [notFound, setNotFound] = useState(false)
 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/cities`)
            .then(e => setCities(e.data))
            .catch(e => console.log(e))

    }, [search])
    function handleSearch(event){
        setNotFound(false)
        const searchValue = event.target.value.toLowerCase();
        setSearch(searchValue);

        const filtered = cities.filter((city) =>
            city.name.toLowerCase().includes(searchValue)
        );
        if(filtered.length === 0) setNotFound(true)
        setFilteredCities(filtered);
    };
    function seeTickets(e){
        e.preventDefault();
        let findCity = undefined;

        if(!idCity){
                findCity = cities.filter((city) =>
                city.name.toLowerCase().includes(search.toLowerCase())
            );
           
            if(findCity.length === 0){
                setNotFound(true)
                return;
            }else{
                console.log(findCity[0].id)
                navigate("/passagens/"+findCity[0].id)
                return;
            }
        }

        navigate("/passagens/"+idCity)
    }
    function handleClickCity(id, name){
        setIdCity(id);    
        setSearch(name)   
      };
    if(!cities){
        return(
            <>
                <Topo/>
                <Loading>Carregando...</Loading>
            </>
        )
    }
    return (
        <>
            <Topo/>
            <HomeContainer>
                <ContainerInput onSubmit={seeTickets}>
                    <div>
                        <input
                            type="text"
                            id="search_input"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Busque pela cidade que deseja visitar!"
                        />
                        <button>Ver Passagens</button>
                    </div>
                    <ul>
                        {notFound?<li>Cidade não cadastrada! Tente outra</li>:
                        filteredCities.map((city) => (
                            <li
                                key={city.id}
                                onClick={() => handleClickCity(city.id,city.name)}
                            >
                                {city.name}
                            </li>
                            ))}
                    </ul>
                    
                </ContainerInput>

                <ApresentacaoContainer>
                    <CaixaApresentacao>
                        <p>1- Escolha a cidade que deseja visitar</p>
                        <img alt="cidade logo" src="https://cdn-icons-png.flaticon.com/512/6260/6260160.png"/>
                    </CaixaApresentacao>
                    <CaixaApresentacao>
                        <p>2- Veja as passagens disponíveis, com preços e datas</p>
                        <img alt="avião logo" src="https://cdn-icons-png.flaticon.com/512/1585/1585550.png"/>
                    </CaixaApresentacao>
                    <CaixaApresentacao>
                        <p>3- Veja os locais onde você pode se hospedar com todo o conforto!</p>
                        <img alt="hospedagem logo" src="https://cdn.icon-icons.com/icons2/2818/PNG/512/beach_house_landscape_icon_179509.png"/>
                    </CaixaApresentacao>
                </ApresentacaoContainer>
            </HomeContainer>
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
const ContainerInput = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
        width: 70%;
        display: flex;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        input{
            width: calc(100% - 20px);
            height: 50px;
            background-color: #fff;
            border: 1px solid #fff;
            font-size: 15px;
            padding-left: 10px;
        }
        button{
            border: #fff;
            cursor: pointer;
            background-color: #50c8c6;
            font-weight: 600;
        }
    }
    ul{
            width: 70%;
            background-color: #fff;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        }
`
const HomeContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: calc(100vh - 70px);
    background-image: url('https://content.presspage.com/uploads/685/c1920_fernandodenoronhabrazil-2.jpg?65057');
    background-repeat: no-repeat;
    background-size: cover;
`

const ApresentacaoContainer = styled.div`
    display: flex;
    width: 70%;
    justify-content: space-between;

`

const CaixaApresentacao = styled.div`
    border: 1px solid #fff;
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fcfade;
    border-radius: 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    opacity: 70%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 15px;
    p{
        font-size: 20px;
        width: 100%;   
        font-weight:600 ;
    }
    img{
        width: 200px;
        height: 200px;
    }
`