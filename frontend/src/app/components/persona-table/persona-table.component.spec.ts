import { TestBed } from '@angular/core/testing';

import { PersonaTableComponent } from './persona-table.component';

describe('PersonaTableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaTableComponent],
    }).compileComponents();
  });

  it('should render the personas table', () => {
    const fixture = TestBed.createComponent(PersonaTableComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('table')).toBeTruthy();
    expect(element.textContent).toContain('No hay personas para mostrar.');
  });

  it('should show the name and phone number', () => {
    const fixture = TestBed.createComponent(PersonaTableComponent);
    fixture.componentRef.setInput('personas', [
      {
        id: 1,
        nombre: 'Ana',
        primer_apellido: 'López',
        segundo_apellido: null,
        telefono: '5551234567',
        estatus: 'A',
      },
    ]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Ana López');
    expect(element.textContent).toContain('5551234567');
  });

  it('should emit the selected persona', () => {
    const persona = {
      id: 1,
      nombre: 'Ana',
      primer_apellido: 'López',
      segundo_apellido: null,
      telefono: '5551234567',
      estatus: 'A' as const,
    };
    const fixture = TestBed.createComponent(PersonaTableComponent);
    const detalle = vi.fn();

    fixture.componentRef.setInput('personas', [persona]);
    fixture.componentInstance.detalle.subscribe(detalle);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(detalle).toHaveBeenCalledWith(persona);
  });
});
