import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { App } from './app';
import { PersonaService } from './services/persona.service';

describe('App', () => {
  const personas = [
    {
      id: 1,
      nombre: 'Ana',
      primer_apellido: 'López',
      segundo_apellido: 'Martínez',
      telefono: '5551234567',
      estatus: 'A' as const,
    },
    {
      id: 2,
      nombre: 'Carlos',
      primer_apellido: 'Pérez',
      segundo_apellido: 'Ramírez',
      telefono: '5557654321',
      estatus: 'A' as const,
    },
  ];
  const personaService = {
    listar: vi.fn(() => of(personas)),
  };

  beforeEach(async () => {
    personaService.listar.mockReset();
    personaService.listar.mockReturnValue(of(personas));

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
    expect(element.querySelector('h1')?.textContent).toContain('CQCIAS Personas');
  });

  it('should render the CQCIAS logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const logo = fixture.nativeElement.querySelector('.brand-mark img') as HTMLImageElement;
    expect(logo.getAttribute('src')).toBe('/cqcias-logo.png');
    expect(logo.getAttribute('alt')).toBe('Logo de CQCIAS');
  });

  it('should load personas from the service', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(personaService.listar).toHaveBeenCalledOnce();
    expect(element.textContent).toContain('Ana López Martínez');
    expect(element.textContent).toContain('Carlos Pérez Ramírez');
  });

  it('should show the selected persona detail', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.person-row') as HTMLTableRowElement;
    row.click();
    fixture.detectChanges();

    const detail = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    const labels = Array.from(detail.querySelectorAll('dt')).map((label) =>
      label.textContent?.trim(),
    );

    expect(detail.getAttribute('aria-modal')).toBe('true');
    expect(labels).toEqual([
      'ID',
      'Nombre',
      'Primer apellido',
      'Segundo apellido',
      'Teléfono',
      'Estatus',
    ]);
    expect(detail.textContent).toContain('1');
    expect(detail.textContent).toContain('Ana');
    expect(detail.textContent).toContain('López');
    expect(detail.textContent).toContain('Martínez');
    expect(detail.textContent).toContain('5551234567');
    expect(detail.textContent).toContain('Activo');
  });

  it('should close the selected persona detail', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.person-row') as HTMLTableRowElement;
    row.click();
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.close-button') as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('should show an error when personas cannot be loaded', () => {
    personaService.listar.mockReturnValueOnce(throwError(() => new Error('network error')));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('No fue posible cargar las personas.');
  });
});
