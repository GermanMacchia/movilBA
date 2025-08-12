import {Component, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header, Sidebar} from '@components';
import {AppService} from '@src/app/core/services/app-service';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectDataLoading} from '@src/app/core/store/selectors';

@Component({
    selector: 'app-home',
    imports: [RouterOutlet, Header, Sidebar],
    templateUrl: './home.html',
    host: {
        class: 'text-center',
    }
})
export class Home implements OnInit{
    appService = inject(AppService)
    location = inject(Location)
    loading = signal<boolean>(false)
    store$ = inject(Store)

    ngOnInit() {
        this.store$.select(selectDataLoading).subscribe(this.loading.set)
    }
}
