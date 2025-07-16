import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosMenu } from './modulos-menu';

describe('ModulosMenu', () => {
  let component: ModulosMenu;
  let fixture: ComponentFixture<ModulosMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulosMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
