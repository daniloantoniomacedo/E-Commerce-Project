import { Alert, AlertColor, Button, Grid, Link, Paper, Snackbar, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import FormInputText from "../components/FormInputText";
import { ILogInRequest, ILogInResponse } from "../interfaces/Interfaces";
import { AUTO_HIDE_DURATION_SNACKBAR, UNEXPECTED_ERROR_MSG } from "../util/constantes";

export default function Login() {

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
            className='card-centralizado'
            >

                <Typography 
                variant="h5" 
                component="div"
                align="center"
                >Login</Typography>
                
                <Grid 
                container 
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >

                    <Grid item>
                        <FormInputText
                        name='email'
                        control={control}
                        label='Email'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item>
                        <FormInputText
                        name='password'
                        control={control}
                        label='Senha'
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
                            variant={'contained'}>Entrar</Button>
                            </Grid>

                            <Grid 
                            item>
                            <Button 
                            onClick={() => reset()} 
                            variant={'outlined'}>Limpar</Button>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="body2" component="div">Não tem uma conta? <Link href="/home">Cadastre-se.</Link></Typography>
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

