import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PersonaTableComponent } from './components/persona-table/persona-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PersonaTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
