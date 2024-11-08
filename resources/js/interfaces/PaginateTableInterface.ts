export interface PaginateTableInterface<T> {
    data: T[];                 // Array of items of generic type T
    current_page: number;      // Current page number
    per_page: number;          // Number of items per page
    total: number;             // Total number of items
    last_page: number;         // Last page number
    from: number | null;       // Index of first item on the current page
    to: number | null;         // Index of last item on the current page
    next_page_url?: string | null; // URL for the next page, if it exists
    prev_page_url?: string | null; // URL for the previous page, if it exists
    path: string;              // Base path of the pagination URL
    first_page_url: string;    // URL for the first page
    last_page_url: string;     // URL for the last page
}
