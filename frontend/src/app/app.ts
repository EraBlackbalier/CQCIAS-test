import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PersonaTableComponent } from './components/persona-table/persona-table.component';
import { Persona } from './models/persona';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PersonaTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly personaService = inject(PersonaService);

  protected readonly title = signal('CQCIAS Personas');
  protected readonly personas = signal<Persona[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal('');
  protected readonly personaSeleccionada = signal<Persona | null>(null);
  protected readonly totalPersonas = computed(() => this.personas().length);

  ngOnInit(): void {
    this.cargarPersonas();
  }

  protected cargarPersonas(): void {
    this.cargando.set(true);
    this.error.set('');
    this.personaSeleccionada.set(null);

    this.personaService.listar().subscribe({
      next: (personas) => {
        this.personas.set(personas);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar las personas. Intenta nuevamente.');
        this.cargando.set(false);
      },
    });
  }

  protected seleccionarPersona(persona: Persona): void {
    this.personaSeleccionada.set(persona);
  }

  protected nombreCompleto(persona: Persona): string {
    return [persona.nombre, persona.primer_apellido, persona.segundo_apellido]
      .filter(Boolean)
      .join(' ');
  }

  protected cerrarDetalle(): void {
    this.personaSeleccionada.set(null);
  }
}
