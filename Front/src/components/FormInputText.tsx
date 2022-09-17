import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import InputMask from 'react-input-mask';
import { IFormInputTextProps, IMenuItem } from "../interfaces/Interfaces";

export default function FormInputText(props: IFormInputTextProps) {
    return (
        <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue || ''}
        render={({ field: { onChange, value } }) => (
            <InputMask 
            mask={props.mask} 
            value={value} 
            onChange={onChange}
            maskPlaceholder={null}
            >
                {
                    () => (
                        <TextField
                        fullWidth
                        select={props.select}
                        error={props.error}
                        label={props.label}
                        variant={props.variant}
                        onChange={onChange}
                        value={props.defaultValue || value || ''}
                        type={props.type}
                        helperText={props.helperText}
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
        )}
        />
    );
}