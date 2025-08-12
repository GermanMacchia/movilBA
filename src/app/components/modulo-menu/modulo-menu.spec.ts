import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { mockStore } from '@utils/test-utils';
import { ModuloMenu } from './modulo-menu';

describe('ModuloMenu', () => {
  let component: ModuloMenu;
  let fixture: ComponentFixture<ModuloMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ModuloMenu],
        providers:[
            provideMockStore(mockStore),
            Router
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
