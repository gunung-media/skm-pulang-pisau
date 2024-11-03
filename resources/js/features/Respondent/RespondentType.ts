import { BaseTableInterface } from "@/interfaces/BaseTableInterface"

export interface RespondentType extends BaseTableInterface {
    name: string,
    gender: string,
    education: string,
    jobs: string,
    type_of_service?: string,
}
