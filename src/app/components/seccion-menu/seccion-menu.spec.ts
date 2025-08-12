import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {mockStore} from '@utils/test-utils';
import {SeccionMenu} from './seccion-menu';

describe('SeccionMenu', () => {
    let component: SeccionMenu;
    let fixture: ComponentFixture<SeccionMenu>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SeccionMenu],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SeccionMenu);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
