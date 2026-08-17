import { Component, inject, OnInit, signal } from '@angular/core';
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

  protected readonly title = signal('frontend');
  protected readonly personas = signal<Persona[]>([]);

  ngOnInit(): void {
    this.personaService.listar().subscribe((personas) => {
      this.personas.set(personas);
    });
  }
}
