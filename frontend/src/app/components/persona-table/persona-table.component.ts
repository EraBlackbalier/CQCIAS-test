import { Component, input, output } from '@angular/core';

import { Persona } from '../../models/persona';

@Component({
  selector: 'app-persona-table',
  templateUrl: './persona-table.component.html',
  styleUrl: './persona-table.component.css',
})
export class PersonaTableComponent {
  readonly personas = input<Persona[]>([]);
  readonly detalle = output<Persona>();

  protected nombreCompleto(persona: Persona): string {
    return [persona.nombre, persona.primer_apellido, persona.segundo_apellido]
      .filter(Boolean)
      .join(' ');
  }
}
