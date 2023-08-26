package com.backend.repository;

import com.backend.entity.Motociclista;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MotociclistaRepository extends JpaRepository<Motociclista, Long> {
    List<Motociclista> findByCpf(String cpf);

    Motociclista findMotociclistaByEmailAndSenha(String email, String senha);
}