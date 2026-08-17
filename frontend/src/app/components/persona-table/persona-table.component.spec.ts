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
      { id: 1, nombre: 'Ana', telefono: '5551234567', activo: true },
    ]);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Ana');
    expect(element.textContent).toContain('5551234567');
  });
});
