package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.sql.Date;


@Entity
@Table(name = "rota")
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

    @Column(name = "tempoViagem")
    private String tempoViagem;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parada")
    private Parada parada;
}