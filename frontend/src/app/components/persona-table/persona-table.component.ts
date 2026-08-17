import { Component, input } from '@angular/core';

import { Persona } from '../../models/persona';

@Component({
  selector: 'app-persona-table',
  templateUrl: './persona-table.component.html',
})
export class PersonaTableComponent {
  readonly personas = input<Persona[]>([]);
}
