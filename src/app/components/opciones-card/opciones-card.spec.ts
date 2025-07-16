import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesCard } from './opciones-card';

describe('OpcionesCard', () => {
  let component: OpcionesCard;
  let fixture: ComponentFixture<OpcionesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
