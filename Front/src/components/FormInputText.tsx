import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import InputMask from 'react-input-mask';
import { IFormInputProps, IMenuItem } from "../interfaces/Interfaces";

export default function FormInputText(props: IFormInputProps) {

    return (
        <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue || ''}
        render={({ field: { onChange, value } }) => {

            return(
            <InputMask 
            mask={props.mask} 
            value={value || ''} 
            onChange={onChange}
            onBlur={props.onBlur}
            >
                {
                    () => (
                        <TextField
                        fullWidth
                        name={props.name}
                        select={props.select}
                        label={props.label}
                        variant={props.variant}
                        onChange={onChange}
                        value={value || ''}
                        type={props.type}
                        helperText={props.helperText}
                        onBlur={props.onBlur}
                        error={props.error}
                        >
                            {
                                props.options?.map((option: IMenuItem) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    )
                }
            </InputMask>
            );
        }
    }/>)
}