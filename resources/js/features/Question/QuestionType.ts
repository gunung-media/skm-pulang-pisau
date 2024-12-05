import { BaseTableInterface } from "@/interfaces/BaseTableInterface"

export interface QuestionType extends BaseTableInterface {
    question: string
    position?: number
    is_active: boolean
    number_of_answers?: number
    custom_answers?: string,
    question_type_id: number,
    question_type: QuestionType
}
