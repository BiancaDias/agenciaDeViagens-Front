import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TicketsPage(){
    const { idCidade } = useParams();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/cities/ticket/${idCidade}`)
            .then(e => console.log(e.data))
            .catch(e => console.log(e))
    },[])
}