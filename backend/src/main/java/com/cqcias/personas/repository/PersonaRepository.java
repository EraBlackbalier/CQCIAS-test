package com.cqcias.personas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cqcias.personas.model.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
