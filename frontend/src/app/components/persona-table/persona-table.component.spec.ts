import { TestBed } from '@angular/core/testing';

import { PersonaTableComponent } from './persona-table.component';

describe('PersonaTableComponent', () => {
  it('should render the personas table', async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaTableComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(PersonaTableComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('table')).toBeTruthy();
    expect(element.textContent).toContain('No hay personas para mostrar.');
  });
});
