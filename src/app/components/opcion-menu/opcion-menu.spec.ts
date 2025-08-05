import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';
import {OpcionMenu} from './opcion-menu';
import data from '@utils/mockData.json';

describe('OpcionMenu', () => {
    let component: OpcionMenu;
    let fixture: ComponentFixture<OpcionMenu>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OpcionMenu],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(OpcionMenu);

        const mockDataOpciones = data['ADMINISTRADOR'].opciones

        fixture.componentRef.setInput('titulo', 'hola' )
        fixture.componentRef.setInput('opcionesRoutes', mockDataOpciones )

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
