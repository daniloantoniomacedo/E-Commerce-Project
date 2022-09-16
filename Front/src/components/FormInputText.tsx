import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { IFormInputTextProps } from "../interfaces/Interfaces";

export default function FormInputText(props: IFormInputTextProps) {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value } }) => (
                <TextField 
                label={props.label}
                variant={props.variant}
                onChange={onChange}
                value={props.defaultValue || value || ''}
                type={props.type}
                style={{ width: '100%' }}
                />
            )}
        />
    );
}