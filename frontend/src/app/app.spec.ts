import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { App } from './app';
import { PersonaService } from './services/persona.service';

describe('App', () => {
  const personas = [
    { id: 1, nombre: 'Ana López', telefono: '5551234567', activo: true },
    { id: 2, nombre: 'Carlos Pérez', telefono: '5557654321', activo: true },
  ];
  const personaService = {
    listar: vi.fn(() => of(personas)),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: PersonaService, useValue: personaService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('frontend');
  });

  it('should load personas from the service', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(personaService.listar).toHaveBeenCalledOnce();
    expect(element.textContent).toContain('Ana López');
    expect(element.textContent).toContain('Carlos Pérez');
  });
});
