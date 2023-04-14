package com.backend.model.dto;

import com.backend.model.entity.Rota;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MotociclistaDTO {

    private Long id;

    private String nome;

    private String cpf;

    private String email;

    private String senha;

    private Rota rota;
}