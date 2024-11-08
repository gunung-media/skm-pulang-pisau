import Icon from "@/components/Icon";
import { router } from "@inertiajs/react";
import axios, { AxiosResponse } from "axios";

type TablePaginationProps = {
    currentPage?: number;
    totalPages?: number;
    previousPage?: string | null;
    nextPage?: string | null;
    onChangePage: (data: AxiosResponse) => void;
};


const TablePagination = ({ currentPage = 1, totalPages = 1, previousPage, nextPage, onChangePage }: TablePaginationProps) => {

    const fetchNewPage = async (url: string) => {
        const data = await axios.get(url)
        return data
    }

    return (
        <div className="flex justify-between items-center mt-6 md:mt-5">
            {previousPage && (
                <button className="btn-stroke btn-small" onClick={async () => onChangePage(await fetchNewPage(previousPage))}>
                    <Icon name="arrow-prev" />
                    <span>Prev</span>
                </button>
            )}
            <div className="text-sm font-bold">Halaman {currentPage} dari {totalPages}</div>
            {nextPage && (
                <button className="btn-stroke btn-small" onClick={async () => onChangePage(await fetchNewPage(nextPage))}>
                    <span>Next</span>
                    <Icon name="arrow-next" />
                </button>
            )}
        </div>
    )
};

export default TablePagination;
