import { type } from 'os';
import { FocusEventHandler } from 'react';
import { Control } from 'react-hook-form';

// HTTP request response interfaces

export interface ILogInRequest {
    email: string;
    password: string;
}

export interface ILogInResponse {
    response: string;
    time: string;
}

export interface IViaCepResponse {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
}

// Props react components interfaces

export interface IMenuItem {
    value: string,
    label: string,
}

export interface IFormInputProps {
    name: string, 
    defaultValue?: string,
    control: Control<any, any>, 
    label: string,
    variant: "standard" | "filled" | "outlined" | undefined,
    type?: "password" | "numeric",
    helperText?: string,
    inputProps?: any, 
    mask?: any,
    select?: boolean,
    options?: IMenuItem[],
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    error?: boolean
}

export interface IFormValidador {
    nome: boolean,
    cpf: boolean,
    dataNascimento: boolean, 
    email: boolean, 
    celular: boolean,
    cep: boolean,
    cidade:boolean,
    bairro:boolean,
    endereco:boolean,
    numero:boolean,
    uf:boolean,
    senha:boolean,
    senhaConfirmacao: boolean,
}