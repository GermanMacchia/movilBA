import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';
import {Opciones} from './opciones';

describe('Opciones', () => {
    let component: Opciones;
    let fixture: ComponentFixture<Opciones>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Opciones],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Opciones);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
