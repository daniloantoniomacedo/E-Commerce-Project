import { Alert, AlertColor, Button, Grid, Link, Paper, Snackbar, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import FormInputText from "../components/FormInputText";
import { ILogInRequest, ILogInResponse } from "../interfaces/Interfaces";
import { AUTO_HIDE_DURATION_SNACKBAR, UNEXPECTED_ERROR_MSG } from "../util/constantes";

export default function Cadastro() {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [messageSnackbar, setMessageSnackbar] = useState('');

    const [severitySnackbar, setSeveritySnackbar] = useState<AlertColor>('info');

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const { handleSubmit, reset, control } = useForm<ILogInRequest>();

    const giveFeedback = (message: string, severity: AlertColor) => {
        setOpenSnackbar(true);
        setMessageSnackbar(message);
        setSeveritySnackbar(severity);
    }

    const onSubmit = async (loginRequest: ILogInRequest) => {
        giveFeedback('sucesso', 'success');
    }
    
    const showSuccessFeedBack = (axiosResponse: AxiosResponse<ILogInResponse, any>) => {
        giveFeedback(axiosResponse.data.response, 'success');
    }

    const showErrorFeedBack = (error: any) => {
        if(axios.isAxiosError(error)){
            giveFeedback(error.message, 'error');
        } else {
            giveFeedback(UNEXPECTED_ERROR_MSG, 'error');
        }
    }

    const redirectAfterLogin = () => {
        return <Navigate to = { '/home' }/>;
    }

    return (
        <>
            <Paper  
            elevation={12}
            className={ 'cadastro centralizado' }
            >

                <Typography 
                variant="h5" 
                component="div"
                align="center"
                >Cadastro</Typography>
                
                <Grid 
                container 
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name='nome'
                        control={control}
                        label='Nome'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name='email'
                        control={control}
                        label='Email'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name='endereco'
                        control={control}
                        label='Endereço'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item xs={4} md={2}>
                        <FormInputText
                        name='numero'
                        control={control}
                        label='Número'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item xs={8} md={4}>
                        <FormInputText
                        name='cep'
                        control={control}
                        label='CEP'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name='password'
                        control={control}
                        label='Senha'
                        variant='standard'
                        type='password'
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name='password-confirmation'
                        control={control}
                        label='Repita a senha'
                        variant='standard'
                        type='password'
                        />
                    </Grid>

                    <Grid item>
                        <Grid 
                        container 
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                            <Grid 
                            item>
                            <Button 
                            onClick={handleSubmit(onSubmit)} 
                            variant={'contained'}>Cadastrar</Button>
                            </Grid>

                            <Grid 
                            item>
                            <Button 
                            onClick={() => reset()} 
                            variant={'outlined'}>Limpar</Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Paper>

            <Snackbar 
            open={openSnackbar} 
            autoHideDuration={AUTO_HIDE_DURATION_SNACKBAR} 
            onClose={handleCloseSnackbar}>
                <Alert 
                onClose={handleCloseSnackbar} 
                severity={severitySnackbar}
                sx={{ width: '100%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>

        </>
    );
}