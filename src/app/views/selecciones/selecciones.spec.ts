import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import mockData from '@utils/mockData.json';
import { mockStore } from '@utils/test-utils';
import { Selecciones } from './selecciones';

describe('Selecciones', () => {
    let component: Selecciones;
    let fixture: ComponentFixture<Selecciones>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Selecciones],
            providers: [provideMockStore(mockStore), ActivatedRoute]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Selecciones);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('seleccion', mockData.OPERADOR.secciones[0]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
