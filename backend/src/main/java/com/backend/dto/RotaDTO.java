package com.backend.dto;

import com.backend.entity.Parada;
import com.backend.entity.PontoInteresse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RotaDTO{

    private Long id;

    private String pontoPartida;

    private String pontoDestino;

    private Double distancia;

    private Timestamp tempoEstimado;

    private Parada parada;

    private PontoInteresse pontoInteresse;
}