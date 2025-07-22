import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionMenu } from './opcion-menu';

describe('OpcionMenu', () => {
  let component: OpcionMenu;
  let fixture: ComponentFixture<OpcionMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpcionMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
