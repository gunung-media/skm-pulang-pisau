import { BaseTableInterface } from "@/interfaces/BaseTableInterface";

export interface UserType extends BaseTableInterface {
    name: string;
    email: string;
    password: string;
}
