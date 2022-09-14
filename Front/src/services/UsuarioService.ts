import axios from "axios";
import { ILogInRequest, ILogInResponse } from "../interfaces/Interfaces";

export async function logar(request: ILogInRequest, accessToken: string) {
    
    return await axios.post<ILogInResponse>(
        `${process.env.REACT_APP_BASE_URL}usuario/autenticar`,
        request,
        { headers: { Accept: 'application/json', 
                     ContentType: 'application/json', 
                     Authorization: `Bearer ${accessToken}` } }
    );

}