import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { ResponseType } from "./ResponseType";

export type ResponseDto = Omit<ResponseType, keyof BaseTableInterface | 'respondent_id'>;
