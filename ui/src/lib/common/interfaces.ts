import { FormGroup } from "@angular/forms"
import { DataTypes } from "./enums"

export type FormData = {
    key: string,
    type: DataTypes,
    value: any,
    options?: {
        list: any[]
        optionLabel?: string,
        optionValue?: string,
    },
    disabled?: boolean
}
export type FormModalInfo = {
    title: string,
    info: string,
    icon: string,
    formgroup: FormGroup | null,
    data: FormData[] | null
}
