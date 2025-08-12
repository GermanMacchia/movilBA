import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideMockStore(mockStore)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
