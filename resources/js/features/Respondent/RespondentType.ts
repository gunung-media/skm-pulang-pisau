import { BaseTableInterface } from "@/interfaces/BaseTableInterface"
import { ResponseType } from "@/features/Response"

export interface RespondentType extends BaseTableInterface {
    name: string,
    gender: string,
    education: string,
    age: number,
    jobs: string,
    type_of_service: string,
    index_satisfaction?: string
    responses?: ResponseType[]
    suggestion?: string
}
