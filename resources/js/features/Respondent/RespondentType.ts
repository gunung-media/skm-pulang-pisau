import { BaseTableInterface } from "@/interfaces/BaseTableInterface"
import { ResponseType } from "@/features/Response"
import { ServiceType } from "../Service"

export interface RespondentType extends BaseTableInterface {
    name: string,
    gender: string,
    education: string,
    age: number,
    jobs: string,
    service_id: number,
    index_satisfaction?: string
    responses?: ResponseType[]
    suggestion?: string
    service?: ServiceType
}
