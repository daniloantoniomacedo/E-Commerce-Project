import axios from "axios";
import { IViaCepResponse } from "../interfaces/Interfaces";

export async function consultarCep(cep: string) {

    return await axios.get<IViaCepResponse>(
        `${process.env.REACT_APP_BASE_URL}endereco/obter`,
        { headers: { Accept: 'application/json'}, params: { cep: cep } }
    );

}