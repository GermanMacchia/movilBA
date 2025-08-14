import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import mockData from '@utils/mockData.json';
import { mockStore } from '@utils/test-utils';
import { Modulos } from './modulos';

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
        fixture.componentRef.setInput('modulos', mockData.OPERADOR.modulos);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
