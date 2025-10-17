import { TitleCasePipe } from '@angular/common'
import {
	AfterViewInit,
	Component,
	ElementRef,
	inject,
	input,
	signal,
	ViewChild,
} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { filter, finalize } from 'rxjs'
import { DataTypes } from '../common/enums'
import { FormModalService } from './form-modal.service'

@Component({
	selector: 'lib-form-modal',
	imports: [TitleCasePipe, ReactiveFormsModule],
	templateUrl: './form-modal.html',
	styles: `
		.input {
			width: var(--input-width);
			&:focus,
			&:focus-within {
				--input-color: green;
				outline: none;
			}
		}
		.modal-box,
		.modal-middle {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: auto;
		}
	`,
	host: {
		'[style.--input-width]': 'inputWidth()',
	},
})
export class FormModal implements AfterViewInit {
	service = inject(FormModalService)
	types = DataTypes
	@ViewChild('dialog')
	dialog!: ElementRef<HTMLDialogElement>
	inputWidth = input<string>('25rem')

	ngAfterViewInit(): void {
		this.service.modalVisible
			.pipe(filter(ele => ele))
			.subscribe(() => this.dialog.nativeElement.showModal())
		//evito que se vacie el modal antes de que cierre
		this.service.modalVisible
			.pipe(
				finalize(() => this.service.reset()),
				filter(ele => !ele),
			)
			.subscribe(() => this.dialog.nativeElement.close())
	}
}
