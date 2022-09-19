package com.ecommerceproject.service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.time.Duration;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ecommerceproject.exception.NegocioException;
import com.ecommerceproject.to.EnderecoResponse;
import com.ecommerceproject.utils.Constantes;
import com.ecommerceproject.utils.JsonBodyHandler;

@Service
public class ViaCepService {

	private static void validarCep(String cep) throws NegocioException{
		if(Objects.isNull(cep) || !cep.matches(Constantes.REGEX_CEP)){
			throw new NegocioException(HttpStatus.BAD_REQUEST, Constantes.CEP_BAD_REQUEST);
		}
	}
	
	private static void verificarEnderecoResponse(EnderecoResponse response) throws NegocioException {
		if(Objects.isNull(response)) {
			throw new NegocioException(HttpStatus.INTERNAL_SERVER_ERROR, Constantes.FALHA_INTEGRACAO_VIA_CEP);
		} else if(Objects.nonNull(response.getErro())) {
			throw new NegocioException(HttpStatus.NOT_FOUND, Constantes.CEP_NOT_FOUND);
		}
	}
	
    public EnderecoResponse obterEnderecoPeloCep(String cep) throws NegocioException {
    	
    	validarCep(cep);
    	
    	EnderecoResponse enderecoResponse = null;
    	
        try {

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(String.format("https://viacep.com.br/ws/%s/json/", cep)))
                    .timeout(Duration.ofSeconds(3L))
                    .GET()
                    .build();

            HttpClient client = HttpClient.newBuilder().build();
            enderecoResponse = client.send(request, new JsonBodyHandler<>(EnderecoResponse.class)).body();

        } catch (URISyntaxException | IOException | InterruptedException e) {
            throw new NegocioException(HttpStatus.INTERNAL_SERVER_ERROR, Constantes.ERRO_INTERNO_SERVIDOR, e);
        }
        
        verificarEnderecoResponse(enderecoResponse);
        
        return enderecoResponse;
    }

}
