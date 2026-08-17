package com.cqcias.personas.controller;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.cqcias.personas.model.Persona;
import com.cqcias.personas.repository.PersonaRepository;

class PersonaControllerTest {

	private PersonaRepository personaRepository;
	private MockMvc mockMvc;

	@BeforeEach
	void setUp() {
		personaRepository = mock(PersonaRepository.class);
		mockMvc = MockMvcBuilders.standaloneSetup(new PersonaController(personaRepository)).build();
	}

	@Test
	void devuelvePersonasActivas() throws Exception {
		Persona persona = new Persona();
		persona.setId(1L);
		persona.setNombre("Ana López");
		persona.setTelefono("5551234567");
		persona.setActivo(true);

		when(personaRepository.findByActivoTrue()).thenReturn(List.of(persona));

		mockMvc.perform(get("/api/personas"))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].nombre").value("Ana López"))
				.andExpect(jsonPath("$[0].telefono").value("5551234567"))
				.andExpect(jsonPath("$[0].activo").value(true));

		verify(personaRepository).findByActivoTrue();
	}
}
