package com.ecommerceproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerceproject.exception.NegocioException;
import com.ecommerceproject.service.ViaCepService;
import com.ecommerceproject.utils.Constantes;

@Controller
@RequestMapping("api/v1/endereco")
public class EnderecoController {

    @Autowired
    private ViaCepService viaCepService;

    @SuppressWarnings("rawtypes")
	@GetMapping(value = "/obter",
                produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity obterEnderecoPeloCep(@RequestParam String cep) {
        ResponseEntity responseEntity = null;
        try {
            responseEntity = ResponseEntity.ok(viaCepService.obterEnderecoPeloCep(cep));
        } catch (NegocioException e) {
        	responseEntity = ResponseEntity
                    .status(e.getHttpStatus())
                    .body(e.getMensagem());
			
		} catch(RuntimeException e){
            responseEntity = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Constantes.ERRO_INTERNO_SERVIDOR);
		}

        return responseEntity;
    }

}
