package com.cqcias.personas.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cqcias.personas.model.Persona;
import com.cqcias.personas.repository.PersonaRepository;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

	private final PersonaRepository personaRepository;

	public PersonaController(PersonaRepository personaRepository) {
		this.personaRepository = personaRepository;
	}

	@GetMapping
	public List<Persona> listarActivas() {
		return personaRepository.findByActivoTrue();
	}
}
