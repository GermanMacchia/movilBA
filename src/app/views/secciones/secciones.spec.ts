import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Secciones } from './secciones';

describe('Secciones', () => {
  let component: Secciones;
  let fixture: ComponentFixture<Secciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Secciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Secciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
