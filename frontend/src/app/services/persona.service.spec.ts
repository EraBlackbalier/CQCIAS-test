import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Persona } from '../models/persona';
import { PersonaService } from './persona.service';

describe('PersonaService', () => {
  let service: PersonaService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PersonaService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should list personas', () => {
    const personas: Persona[] = [{ id: 1, nombre: 'Ana', telefono: '5551234567', activo: true }];

    service.listar().subscribe((response) => {
      expect(response).toEqual(personas);
    });

    const request = httpTesting.expectOne('/api/personas');
    expect(request.request.method).toBe('GET');
    request.flush(personas);
  });
});
