package com.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@Table(name = "motociclista")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Rota implements Serializable {

    private static final long serialVersionUID = 6496510870570363104L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "pontoPartida")
    private String pontoPartida;

    @Column(name = "pontoDestino")
    private String pontoDestino;

    @Column(name = "distancia")
    private Double distancia;

    @Column(name = "tempoEstimado")
    private Timestamp tempoEstimado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parada")
    private Parada parada;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="pontoInteresse")
    private PontoInteresse pontoInteresse;
}