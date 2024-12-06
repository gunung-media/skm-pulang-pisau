import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { RespondentType } from "./RespondentType";

export type RespondentDto = Omit<RespondentType, keyof BaseTableInterface | 'index_satisfaction' | 'responses' | 'service'>

const respondentDtoKeys = <T>(obj: T) => Object.keys(obj as any) as (keyof T)[];

export const respondentKeys = respondentDtoKeys<RespondentDto>({
    name: '',
    gender: '',
    education: '',
    age: 0,
    jobs: '',
    service_id: 1,
    suggestion: ''
});

