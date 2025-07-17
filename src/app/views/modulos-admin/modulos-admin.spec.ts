import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosAdmin } from './modulos-admin';

describe('ModulosAdmin', () => {
  let component: ModulosAdmin;
  let fixture: ComponentFixture<ModulosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulosAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulosAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
