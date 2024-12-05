import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { QuestionType } from "../Question";

export interface QTType extends BaseTableInterface {
    name: string
    questions: QuestionType[]
}
