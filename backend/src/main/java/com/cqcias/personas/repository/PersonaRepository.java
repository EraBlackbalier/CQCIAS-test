package com.cqcias.personas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cqcias.personas.model.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Integer> {

	List<Persona> findByEstatus(String estatus);
}
