import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { QTType } from "./QTType";

export type QTDto = Omit<QTType, keyof BaseTableInterface | 'questions'>;
