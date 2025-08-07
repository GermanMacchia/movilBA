import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Home } from '@src/app/views/home/home';
import { mockStore } from '@utils/test-utils';
import { NgxPermissionsModule } from 'ngx-permissions';

describe('Home', () => {
    let component: Home;
    let fixture: ComponentFixture<Home>;
    let compiled: HTMLElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Home, NgxPermissionsModule.forRoot()],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.nativeElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have router-oulet', () => {
        const routerOulet = compiled.querySelector('router-outlet');
        expect(routerOulet).toBeTruthy();
    });

    it('should have app-header', () => {
        const appHeader = compiled.querySelector('app-header');
        expect(appHeader).toBeTruthy();
    });

    it('should have app-header', () => {
        const appSidebar = compiled.querySelector('app-sidebar');
        expect(appSidebar).toBeTruthy();
    });

    it('should have back button', () => {
        const backButton = compiled.querySelector('[data-testid="btn"]');
        expect(backButton).toBeTruthy();
    });

    it('should have undo icon', () => {
        const icon = compiled.querySelector('[data-testid="icon"]');
        expect(icon).toBeTruthy();
        expect(icon?.textContent?.trim()).toBe('undo');
    });
});
