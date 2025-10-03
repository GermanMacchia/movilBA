/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

export enum SimpleListType {
  STRING = 'string',
  DATE = 'date',
  BOOLEAN = 'boolean',
  EMAIL = 'email'
}

@Component({
  selector: 'lib-simple-list',
  imports: [DatePipe],
  templateUrl: './simple-list.component.html',
})
export class SimpleListComponent {
  /**
   * Ejemplo:
   * [{key: 'usuarios.admin.nombre', type: SimpleListType.STRING}]
  */
  dataKeys = input.required<{ key: string, type: SimpleListType, trueCase?: any }[]>()
  actions = input<{ icon: string, info: string, action: () => void }[]>()
  data = input.required<any[]>()
  headers = input.required<string[]>()
  types = SimpleListType

  getValue = (ele: any, key: string) => {
    const keys = key.split('.')
    let value

    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      value = ele[key]
    }

    return value
  }

  sendEmail = (email: string) => ''
}
