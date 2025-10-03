import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { InfoModalService } from './info-modal.service';


@Component({
  selector: 'lib-info-modal',
  templateUrl: './info-modal.component.html',
})
export class InfoModalComponent implements AfterViewInit {
  service = inject(InfoModalService)

  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>

  ngAfterViewInit(): void {
    this.service.modalVisible.subscribe(isVisible =>
      isVisible
        ? this.dialog.nativeElement.showModal()
        : this.dialog.nativeElement.close())
  }
}
