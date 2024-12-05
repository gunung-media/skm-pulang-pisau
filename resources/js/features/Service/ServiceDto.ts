import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { ServiceType } from "./ServiceType";

export type ServiceDto = Omit<ServiceType, keyof BaseTableInterface>;
