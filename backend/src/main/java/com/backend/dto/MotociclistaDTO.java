package com.backend.dto;

import com.backend.entity.Moto;
import com.backend.entity.Rota;
import lombok.*;

import java.util.List;


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

    private List<Rota> rota;

    private Moto moto;
}