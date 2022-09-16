import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import Login from "./pages/login";

export default function Rotas() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path = { '/' } element = { <Navigate to = { '/home' }/> }/>
                <Route path = { '/home' } element = { <Home/> }/>
                <Route path = { '/login' } element = { <Login/> } />
                <Route path = { '/cadastro' } element = { <Cadastro/> } />
            </Routes>
        </BrowserRouter>
    );
}