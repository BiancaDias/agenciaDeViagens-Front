import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import HomePage from "./pages/HomePage";
import Topo from "./components/Topo";
import TicketsPage from "./pages/TicketsPage";
import TicketDetails from "./pages/TicketDetails";
import AccommodationPage from "./pages/AccommodationPage";
import AccommodationDetails from "./pages/AccommodationDetails";

export default function App() {
  return (
    <PagesContainer>
      <Topo/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/passagens/:idCidade" element={<TicketsPage/>}/>
        <Route path="/passagens/detalhes/:idPassagem" element={<TicketDetails/>}/>
        <Route path="/hospedagens/:idCidade" element={<AccommodationPage/>}/>
        <Route path="/hospedagens/detalhes/:idHospedagem" element={<AccommodationDetails/>}/>
      </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.div`
  width: 100%;
  height: 100vh;
`
