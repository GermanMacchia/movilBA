import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';
import {Secciones} from './secciones';

describe('Secciones', () => {
    let component: Secciones;
    let fixture: ComponentFixture<Secciones>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Secciones],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Secciones);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
