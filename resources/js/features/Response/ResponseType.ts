import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { QuestionType } from "../Question";
import { RespondentType } from "../Respondent";

export interface ResponseType extends BaseTableInterface {
    answer: string
    question_id: number
    respondent_id: number
    question?: QuestionType
    respondent?: RespondentType
}
