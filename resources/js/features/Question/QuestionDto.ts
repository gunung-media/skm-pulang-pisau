import { BaseTableInterface } from "@/interfaces/BaseTableInterface"
import { QuestionType } from "./QuestionType"


export type QuestionDto = Omit<QuestionType, keyof BaseTableInterface | 'custom_answers'> & { custom_answers: string[] }

