import { PaginateTableInterface } from "@/interfaces/PaginateTableInterface";
import axios, { AxiosResponse } from "axios";
import { RespondentType } from "./RespondentType";

export const getRespondents = async (duration?: string): Promise<AxiosResponse<PaginateTableInterface<RespondentType>>> => {
    const url = duration
        ? route('admin.respondent.get', { duration })
        : route('admin.respondent.get');
    return await axios.get(url);
}
