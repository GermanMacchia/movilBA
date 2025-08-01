import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ModuloMenu } from './modulo-menu';


describe('ModulosMenu', () => {
  let component: ModuloMenu;
  let fixture: ComponentFixture<ModuloMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ModuloMenu],
        providers:[
            provideMockStore()
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
