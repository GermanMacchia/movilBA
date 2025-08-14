import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockStore } from '@utils/test-utils';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
    let component: Sidebar;
    let fixture: ComponentFixture<Sidebar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Sidebar, NgxPermissionsModule.forRoot()],
            providers: [provideMockStore(mockStore)]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Sidebar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
