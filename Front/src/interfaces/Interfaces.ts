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

// Props react components interfaces

export interface IFormInputTextProps {
    name: string, 
    defaultValue?: string,
    control: Control<any, any>, 
    label: string,
    variant: "standard" | "filled" | "outlined" | undefined,
    type?: "password"
}