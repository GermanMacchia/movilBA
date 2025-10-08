import { TitleCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { filter, finalize } from 'rxjs';
import { DataTypes } from '../common/enums';
import { FormModalService } from './form-modal.service';

@Component({
  selector: 'lib-form-modal',
  imports: [TitleCasePipe, ReactiveFormsModule],
  templateUrl: './form-modal.html',
  styles: `
    :host ::ng-deep .input {
        &:focus,
        &:focus-within {
          --input-color: green;
            outline: none;
        }
    }
    :host ::ng-deep .modal-box, .modal-middle {
      width:inherit !important;
    }`
})
export class FormModal implements AfterViewInit {
  service = inject(FormModalService)
  types = DataTypes
  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>

  ngAfterViewInit(): void {
    this.service.modalVisible
      .pipe(filter(ele => ele))
      .subscribe(() =>
        this.dialog.nativeElement.showModal()
      )
    //evito que se vacie el modal antes de que cierre
    this.service.modalVisible
      .pipe(
        finalize(() => this.service.reset()),
        filter(ele => !ele)
      )
      .subscribe(() =>
        this.dialog.nativeElement.close()
      )
  }
}
