import { AsyncPipe } from '@angular/common'
import {
	Component,
	ElementRef,
	inject,
	OnInit,
	signal,
	ViewChild,
} from '@angular/core'
import { selectLogsData, selectLogsTotal } from 'data-access/src/lib/store'
import { SimpleListComponent } from '@movilBA/ui'
import { Store } from '@ngrx/store'
import { NgxPermissionsService } from 'ngx-permissions'
import { DataTypes } from 'ui/src/lib/common/enums'

@Component({
	selector: 'app-logs',
	imports: [SimpleListComponent, AsyncPipe],
	templateUrl: './logs.component.html',
	styles: `
		table {
			width: 100%;
			th,
			td {
				border-collapse: collapse;
				border: 1px solid black;
				text-align: center;
			}
		}
	`,
})
export class LogsComponent {
	private store$ = inject(Store)
	types = DataTypes
	data$ = this.store$.select(selectLogsData)
	total$ = this.store$.select(selectLogsTotal)
	logInfo = signal<string>('{}')
	@ViewChild('dialog')
	dialog!: ElementRef<HTMLDialogElement>

	showData = (ele: any) => {
		this.logInfo.set(JSON.stringify(ele?.info ?? {}, null, 2))
		this.dialog.nativeElement.showModal()
	}
}
