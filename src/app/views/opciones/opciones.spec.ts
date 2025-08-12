import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import mockData from '@utils/mockData.json';
import { mockStore } from '@utils/test-utils';
import { Opciones } from './opciones';

describe('Opciones', () => {
    let component: Opciones;
    let fixture: ComponentFixture<Opciones>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Opciones],
            providers: [provideMockStore(mockStore), ActivatedRoute]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Opciones);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('opciones', mockData.OPERADOR.opciones);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
