import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { OpcionCard } from './opcion-card';

describe('OpcionCard', () => {
  let component: OpcionCard;
  let fixture: ComponentFixture<OpcionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
          imports: [OpcionCard],
        providers:[
            provideMockStore()
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcionCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
