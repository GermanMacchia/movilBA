import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import mockData from '@utils/mockData.json';
import { mockStore } from '@utils/test-utils';
import { OpcionMenu } from './opcion-menu';

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

        fixture.componentRef.setInput('opcion', mockData.OPERADOR.opciones )

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
