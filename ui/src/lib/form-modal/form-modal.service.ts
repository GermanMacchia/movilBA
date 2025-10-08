import { inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import type { FormData, FormModalInfo } from '../common/interfaces';

const EMPTY_INFO: FormModalInfo = {
  title: '',
  info: '',
  icon: '',
  formgroup: null,
  data: null
}

@Injectable({
  providedIn: 'root'
})
export class FormModalService {
  fb = inject(FormBuilder)
  modalVisible = new BehaviorSubject<boolean>(false)
  modalInfo = signal<FormModalInfo>(EMPTY_INFO)
  formgroup: FormGroup | null = null
  onCancel: () => void = () => { }
  onAccept: () => void = () => { }

  openModal(
    title: string,
    data: FormData[],
    onAccept: () => void,
    onCancel?: () => void,
    info = '',
    icon = ''
  ) {

    const formgroup = this.fb.group({});

    for (let idx = 0; idx < data.length; idx++) {
      const value = data[idx]['value']
      const key = data[idx]['key']
      const disabled = data[idx]['disabled'] ?? false
      formgroup.setControl(key, new FormControl({ value, disabled }));
    }

    this.formgroup = formgroup

    this.modalInfo.set({
      title,
      formgroup: this.fb.group({}),
      info,
      icon,
      data
    })

    this.onAccept = onAccept

    if (onCancel)
      this.onCancel = onCancel

    this.modalVisible.next(true)
  }

  handleAccept = () => {
    this.onAccept()
    this.modalVisible.next(false)
  }

  handleCancel = () => {
    if (this.onCancel)
      this.onCancel()

    this.modalVisible.next(false)
  }

  reset() {
    this.formgroup = null
    this.onCancel = () => { }
    this.onAccept = () => { }
    this.modalInfo.set(EMPTY_INFO)
  }
}
