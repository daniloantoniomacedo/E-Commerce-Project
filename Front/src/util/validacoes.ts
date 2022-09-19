import { REGEX_INTEIRO_POSITIVO } from './constantes';
import moment from 'moment';

export function ehNumericoPositivo(value: string): boolean {
    return REGEX_INTEIRO_POSITIVO.test(value);
}

export function ehNumeroCelularValido(celular: string): boolean {
    return limparMascara(celular).substring(4, 5) === '9';
}

export function ehCepValido(cep: string): boolean {
    return limparMascara(cep).length === 8;
}

export function ehCpfValido(cpf: string): boolean {
    // Validar se é String
    if (typeof cpf !== 'string') return false
    
    // Tirar formatação
    cpf = cpf.replace(/[^\d]+/g, '')
    
    // Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    
    // String para Array
    let digitos: string[] = cpf.split('')
    
    const validator: number[] = digitos
        // Pegar os últimos 2 digitos de validação
        .filter((digit, index, array) => index >= array.length - 2 && digit)
        // Transformar digitos em números
        .map( el => +el )
        
    const toValidate = (pop: number) => digitos
        // Pegar Array de items para validar
        .filter((digit: string, index: number, array: string[]) => index < array.length - pop && digit)
        // Transformar digitos em números
        .map(el => +el)
    
    const rest = (count: number, pop: number) => (toValidate(pop)
        // Calcular Soma dos digitos e multiplicar por 10
        .reduce((soma: number, el: number, i: number) => soma + el * (count - i), 0) * 10) 
        // Pegar o resto da divisao por 11
        % 11 
        // transformar de 10 para 0
        % 10
        
    return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])
}

export function ehEmailValido(email: string): boolean {
    return email.includes('@');
}

export function ehDataValida(data: string): boolean {
    return moment(data, 'DD/MM/YYYY',true).isValid();
}

export function limparMascara(value: string): string {
    return value.replace(/[^\d]+/g, '');
}
