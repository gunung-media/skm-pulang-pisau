import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { RespondentType } from "./RespondentType";

export type RespondentDto = Omit<RespondentType, keyof BaseTableInterface>
