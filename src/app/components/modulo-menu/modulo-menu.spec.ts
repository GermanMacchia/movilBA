import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModuloMenu } from './modulo-menu';
import { provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';

describe('ModuloMenu', () => {
  let component: ModuloMenu;
  let fixture: ComponentFixture<ModuloMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ModuloMenu],
        providers:[
            provideMockStore(mockStore)
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
