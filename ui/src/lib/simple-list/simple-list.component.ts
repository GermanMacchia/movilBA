/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-simple-list',
  templateUrl: './simple-list.component.html',
})
export class SimpleListComponent {
  /**
   * Ejemplo:
   * ['usuarios.admin.nombre', 'unidades.cantidad']
  */
  dataKeys = input.required<string[]>()
  actions = input<{ icon: string, info: string, action: () => void }[]>()
  data = input.required<any[]>()
  headers = input.required<string[]>()

  getValue = (ele: any, key: string) => {
    const keys = key.split('.')
    let value

    for (let idx = 0; idx < keys.length; idx++) {
      const key = keys[idx];
      value = ele[key]
    }

    return value
  }
}
