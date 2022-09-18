import { IMenuItem } from "../interfaces/Interfaces";

export const BASE_URL: string = "http://localhost:8080/api/v1/";

export const AUTO_HIDE_DURATION_SNACKBAR = 5000;

export const UNEXPECTED_ERROR_MSG = "Erro inesperado! Tente novamente mais tarde.";

export const AUTH0_CONNECTION = 'Username-Password-Authentication';

export const REGEX_INTEIRO_POSITIVO = /^\d+$/;

export const OPTIONS_UF: IMenuItem[] = [
    {
        value: 'AC',
        label: 'AC'
    },
    {
        value: 'AL',
        label: 'AL'
    },
    {
        value: 'AP',
        label: 'AP'
    },
    {
        value: 'AM',
        label: 'AM'
    },
    {
        value: 'BA',
        label: 'BA'
    },
    {
        value: 'CE',
        label: 'CE'
    },
    {
        value: 'DF',
        label: 'DF'
    },
    {
        value: 'ES',
        label: 'ES'
    },
    {
        value: 'GO',
        label: 'GO'
    },
    {
        value: 'MA',
        label: 'MA'
    },
    {
        value: 'MT',
        label: 'MT'
    },
    {
        value: 'MS',
        label: 'MS'
    },
    {
        value: 'MG',
        label: 'MG'
    },
    {
        value: 'PA',
        label: 'PA'
    },
    {
        value: 'PB',
        label: 'PB'
    },
    {
        value: 'PR',
        label: 'PR'
    },
    {
        value: 'PE',
        label: 'PE'
    },
    {
        value: 'PI',
        label: 'PI'
    },
    {
        value: 'RJ',
        label: 'RJ'
    },
    {
        value: 'RN',
        label: 'RN'
    },
    {
        value: 'RS',
        label: 'RS'
    },
    {
        value: 'RO',
        label: 'RO'
    },
    {
        value: 'RR',
        label: 'RR'
    },
    {
        value: 'SP',
        label: 'SP'
    },
    {
        value: 'SE',
        label: 'SE'
    },
    {
        value: 'TO',
        label: 'TO'
    }
];

export const CAMPO_OBRIGATORIO = 'Campo obrigatório';

export const NUMERO = 'numero';
export const CPF = 'cpf';
export const DATA_NASCIMENTO = 'dataNascimento';
export const EMAIL = 'email';
export const CELULAR = 'celular';
export const CEP = 'cep';
export const SENHA = 'senha';
export const SENHA_CONFIRMACAO = 'senhaConfirmacao';
