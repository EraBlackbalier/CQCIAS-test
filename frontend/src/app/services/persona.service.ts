import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/personas';

  listar(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }
}
