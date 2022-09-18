import axios from "axios";
import { IViaCepResponse } from "../interfaces/Interfaces";

export async function consultarCep(cep: string) {
    
    return await axios.get<IViaCepResponse>(
        `https://viacep.com.br/ws/41710045${cep}/json/`,
        { headers: { Accept: 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

}