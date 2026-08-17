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

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    const detail = fixture.nativeElement.querySelector('[aria-labelledby="detalle-heading"]');
    expect(detail?.textContent).toContain('Ana López Martínez');
    expect(detail?.textContent).toContain('5551234567');
  });

  it('should close the selected persona detail', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const detailButton = fixture.nativeElement.querySelector('.detail-button') as HTMLButtonElement;
    detailButton.click();
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('.close-button') as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-labelledby="detalle-heading"]')).toBeNull();
  });

  it('should show an error when personas cannot be loaded', () => {
    personaService.listar.mockReturnValueOnce(throwError(() => new Error('network error')));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('[role="alert"]');
    expect(alert?.textContent).toContain('No fue posible cargar las personas.');
  });
});
