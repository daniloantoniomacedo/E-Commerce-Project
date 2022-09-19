import { Alert, AlertColor, Button, Grid, Paper, Snackbar, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import FormInputText from "../components/FormInputText";
import { IFormCadastro, IFormValidador, ILogInResponse, IViaCepResponse } from "../interfaces/Interfaces";
import { consultarCep } from "../services/EnderecoService";
import { AUTO_HIDE_DURATION_SNACKBAR, BAIRRO, CAMPO_OBRIGATORIO, CELULAR, CEP, CIDADE, COMPLEMENTO_ENDERECO, CONSULTA_CEP_INDISPONIVEL, CPF, DATA_NASCIMENTO, EMAIL, ENDERECO, NOME, NUMERO, OPTIONS_UF, SENHA, SENHA_CONFIRMACAO, UF } from "../util/constantes";
import { ehCepValido, ehCpfValido, ehDataValida, ehEmailValido, ehNumericoPositivo, ehNumeroCelularValido, limparMascara } from "../util/validacoes";

export default function Cadastro() {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [messageSnackbar, setMessageSnackbar] = useState('');

    const [severitySnackbar, setSeveritySnackbar] = useState<AlertColor>('info');

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const giveFeedback = (message: string, severity: AlertColor) => {
        setOpenSnackbar(true);
        setMessageSnackbar(message);
        setSeveritySnackbar(severity);
    }

    const onSubmit = async (cadastroRequest: IFormCadastro) => {
        console.log(cadastroRequest);
        giveFeedback('sucesso', 'success');
    }
    
    const showSuccessFeedBack = (axiosResponse: AxiosResponse<ILogInResponse, any>) => {
        giveFeedback(axiosResponse.data.response, 'success');
    }

    const showErrorFeedBack = (error: any, msgError: string) => {
        if(axios.isAxiosError(error) && error.response && error.response.data){
            giveFeedback(error.response.data as string, 'error');
        } else {
            giveFeedback(msgError, 'error');
        }
    }

    const redirectAfterLogin = () => {
        return <Navigate to = { '/home' }/>;
    }

    //-------------------------------------------------------------------------------------------

    const { handleSubmit, reset, setValue, getValues, control } = useForm<IFormCadastro>();

    const [desableNextButton, setDesableNextButton] = useState(false);

    const validadorEstadoInicial: IFormValidador = {
        nome: true,
        cpf: true,
        dataNascimento: true, 
        email: true, 
        celular: true,
        cep: true,
        cidade: true,
        bairro: true,
        endereco: true,
        numero: true,
        uf: true,
        senha: true,
        senhaConfirmacao: true,
    }

    const[validador, setValidador] = useState<IFormValidador>(validadorEstadoInicial);

    const handleOnBlur = (event: any) => {
        let nomeCampo: string = event?.target.name;
        let valorCampo: string = event?.target.value;

        let flag: boolean = true;

        if(valorCampo === ''){ 
            flag = false;
        }else if(nomeCampo === NUMERO){
            flag = ehNumericoPositivo(valorCampo);
        }else if(nomeCampo === CELULAR){
            flag = ehNumeroCelularValido(valorCampo);
        }else if(nomeCampo === CPF){
            flag = ehCpfValido(valorCampo);
        }else if(nomeCampo === DATA_NASCIMENTO){
            flag = ehDataValida(valorCampo);
        }else if(nomeCampo === EMAIL){
            flag = ehEmailValido(valorCampo);
        }else if(nomeCampo === SENHA){

        }else if(nomeCampo === SENHA_CONFIRMACAO){

        }else if(nomeCampo === CEP){
            if(ehCepValido(valorCampo)){
                flag = true;
                atualizarEnderecoPeloCep(limparMascara(valorCampo));
            }
        }

        setValidador({ ...validador, [nomeCampo]: flag });

    }

    const [cepPesquisado, setCepPesquisado] = useState<String>('');

    const atualizarEnderecoPeloCep = (cep: string) => {
        if(cep !== cepPesquisado){
            console.log('pesquisou');
            consultarCep(cep)
            .then((response: AxiosResponse<IViaCepResponse, any>) => {
                let viaCepResponse: IViaCepResponse = response.data;
                setValue(ENDERECO, viaCepResponse.logradouro);
                setValue(COMPLEMENTO_ENDERECO, viaCepResponse.complemento);
                setValue(BAIRRO, viaCepResponse.bairro);
                setValue(CIDADE, viaCepResponse.localidade);
                setValue(UF, viaCepResponse.uf);
            })
            .catch((error: any) => 
            (showErrorFeedBack(error, CONSULTA_CEP_INDISPONIVEL)));
            setCepPesquisado(cep);
        }
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

                    <Grid item xs={12} md={4}>
                        <FormInputText
                        name={NOME}
                        control={control}
                        label='Nome'
                        variant='standard'
                        onBlur={handleOnBlur}
                        error={!validador.nome}
                        helperText={validador.nome ? undefined : CAMPO_OBRIGATORIO}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormInputText
                        name={CPF}
                        control={control}
                        label='CPF'
                        variant='standard'
                        mask={'999.999.999-99'}
                        onBlur={handleOnBlur}
                        error={!validador.cpf}
                        helperText={validador.cpf ? undefined : 'CPF inválido'}
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <FormInputText
                        name={DATA_NASCIMENTO}
                        control={control}
                        label='Data Nascimento'
                        variant='standard'
                        mask={'99/99/9999'}
                        onBlur={handleOnBlur}
                        error={!validador.dataNascimento}
                        helperText={validador.dataNascimento ? undefined : 'Data inválida'}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormInputText
                        name={EMAIL}
                        control={control}
                        label='Email'
                        variant='standard'
                        onBlur={handleOnBlur}
                        error={!validador.email}
                        helperText={validador.email ? undefined : 'E-mail inválido'}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormInputText
                        name={CELULAR}
                        control={control}
                        label='Celular'
                        variant='standard'
                        mask='+55 (99) 9 9999-9999'
                        onBlur={handleOnBlur}
                        error={!validador.celular}
                        helperText={validador.celular ? undefined : 'Número inválido'}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormInputText
                        name={CEP}
                        control={control}
                        label='CEP'
                        variant='standard'
                        mask='99999-999'
                        onBlur={handleOnBlur}
                        error={!validador.cep}
                        helperText={validador.cep ? undefined : 'CEP inválido'}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormInputText
                        name={CIDADE}
                        control={control}
                        label='Cidade'
                        variant='standard'
                        onBlur={handleOnBlur}
                        error={!validador.cidade}
                        helperText={validador.cidade ? undefined : CAMPO_OBRIGATORIO}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <FormInputText
                        name={BAIRRO}
                        control={control}
                        label='Bairro'
                        variant='standard'
                        onBlur={handleOnBlur}
                        error={!validador.bairro}
                        helperText={validador.bairro ? undefined : CAMPO_OBRIGATORIO}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormInputText
                        name={ENDERECO}
                        control={control}
                        label='Endereço'
                        variant='standard'
                        onBlur={handleOnBlur}
                        error={!validador.endereco}
                        helperText={validador.endereco ? undefined : CAMPO_OBRIGATORIO}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormInputText
                        name={COMPLEMENTO_ENDERECO}
                        control={control}
                        label='Complemento do endereço'
                        variant='standard'
                        />
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <FormInputText
                        name={NUMERO}
                        control={control}
                        label='Nº'
                        variant='standard'
                        onBlur={handleOnBlur}
                        error={!validador.numero}
                        helperText={validador.numero ? undefined : 'Insira apenas caracteres numéricos'}
                        />
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <FormInputText
                        select
                        name={UF}
                        control={control}
                        label='UF'
                        variant='standard'
                        options={OPTIONS_UF}
                        onBlur={handleOnBlur}
                        error={!validador.uf}
                        helperText={validador.uf ? undefined : CAMPO_OBRIGATORIO}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name={SENHA}
                        control={control}
                        label='Senha'
                        variant='standard'
                        type='password'
                        onBlur={handleOnBlur}
                        error={!validador.senha}
                        helperText={validador.senha ? undefined : 'A senha deve conter no mínimo oito caracteres com pelos menos duas letras'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormInputText
                        name={SENHA_CONFIRMACAO}
                        control={control}
                        label='Repita a senha'
                        variant='standard'
                        type='password'
                        onBlur={handleOnBlur}
                        error={!validador.senhaConfirmacao}
                        helperText={validador.senhaConfirmacao ? undefined : 'Confirmação inválida'}
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
                            disabled={desableNextButton}
                            onClick={handleSubmit(onSubmit)} 
                            variant={'contained'}>Proximo</Button>
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