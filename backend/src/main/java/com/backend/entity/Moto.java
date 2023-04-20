package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;


@Entity
@Table(name = "moto")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Moto implements Serializable {

    @Serial
    private static final long serialVersionUID = 6496510870570363104L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "marca")
    private String marca;

}