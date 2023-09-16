package com.backend.dto;

import com.backend.entity.Parada;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RotaDTO{

    private Long id;

    private String pontoPartida;

    private String pontoDestino;

    private Double distancia;

    private String tempoViagem;

    private Parada parada;

}