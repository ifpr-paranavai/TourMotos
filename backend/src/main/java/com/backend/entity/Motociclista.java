package com.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;


@Entity
@Table(name = "motociclista")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Motociclista implements Serializable {

    @Serial
    private static final long serialVersionUID = 6496510870570363104L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "email")
    private String email;

    @Column(name = "senha")
    private String senha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rota")
    private Rota rota;
}