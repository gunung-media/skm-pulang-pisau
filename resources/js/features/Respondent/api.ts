import { PaginateTableInterface } from "@/interfaces/PaginateTableInterface";
import axios, { AxiosResponse } from "axios";
import { RespondentType } from "./RespondentType";

export const getRespondents = async (): Promise<AxiosResponse<PaginateTableInterface<RespondentType>>> => await axios.get(route('admin.respondent.get'));
