import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockStore } from '@utils/test-utils';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Home } from './home';

describe('Home', () => {
    let component: Home;
    let fixture: ComponentFixture<Home>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Home, NgxPermissionsModule.forRoot()],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
