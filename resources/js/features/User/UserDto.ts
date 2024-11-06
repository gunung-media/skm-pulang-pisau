import { BaseTableInterface } from "@/interfaces/BaseTableInterface";
import { UserType } from "./UserType";

export type UserLoginDto = Omit<UserType, keyof BaseTableInterface | 'name'> & { remember?: boolean }
export type UserDto = Omit<UserType, keyof BaseTableInterface>
