import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Modulos} from './modulos';
import {provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';

describe('Modulos', () => {
    let component: Modulos;
    let fixture: ComponentFixture<Modulos>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Modulos],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Modulos);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
