import { REGEX_INTEIRO_POSITIVO, NUMERO } from './constantes';

export function ehNumericoPositivo(value: string): boolean {
    return REGEX_INTEIRO_POSITIVO.test(value);
}

//+55 (99) 9 9999-9999
export function ehNumeroCelularValido(value: string): boolean {
    return !value.includes('_') && value.substring(9, 10) === '9';
}

export function ehCepValido(value: string): boolean {
    return !value.includes('_');
}


export function limparMascara(value: string): string {
    return value.replace(/,/g, "").replace(/\./g, "").replace(/-/g, "").replace(/_/g, "");
}
