import { For, Match, Switch, createMemo, createSignal } from "solid-js";
import { QueryClient, QueryClientProvider, createQuery } from '@tanstack/solid-query'
import { Cell, ColumnDef, PaginationState, createSolidTable, flexRender, getCoreRowModel, getPaginationRowModel } from "@tanstack/solid-table";
import { fetchData, Product } from '../../data';
import clsx from "clsx";
import PageSizeSelect from "./PageSizeSelect";
import ControlBar from "./ControlBar";
import Button from "../../components/button/Button";

const queryClient = new QueryClient()
const ProductPage = () => (
    <QueryClientProvider client={queryClient}>
        <ProductTable />
    </QueryClientProvider>
)

const ProductTable = () => {
    const [pagination, setPagination] = createSignal<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const dataQuery = createQuery(
        () => ['data', pagination()],
        () => fetchData(pagination()),
        { keepPreviousData: true, refetchOnWindowFocus: false }
    )

    const columns: ColumnDef<Product>[] = [
        {
            id: 'select',
        },
        {
            id: 'name',
            accessorKey: 'name',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        },
        {
            id: 'category',
            accessorKey: 'category',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        },
        {
            id: 'technology',
            accessorKey: 'technology',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        },
        {
            id: 'description',
            accessorKey: 'description',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        },
        {
            id: 'price',
            accessorKey: 'price',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        },
        {
            id: 'discount',
            accessorKey: 'discount',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }
    ];

    const initSelection: { [id: string]: boolean } = {};
    const [selection, setSelection] = createSignal(initSelection, { equals: false });
    const [allSelect, setAllSelect] = createSignal(false, { equals: false });

    const table = createSolidTable({
        get data() {
            const data = dataQuery.data?.rows ?? [];
            const initSelection = Object.assign({}, ...Array.from({ length: data.length }, (x, i) => i).map(x => ({ [x]: false })));
            setSelection(initSelection);

            return data;
        },
        columns: columns,
        state: { pagination: pagination() },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        debugTable: true,
    });

    const toggleRowSelection = (cell: Cell<Product, unknown>) => {
        const data = selection();
        data[cell.row.id] = !data[cell.row.id];
        setSelection(data);

        const allRowsChecked = Object.values(data).every(x => x);
        setAllSelect(allRowsChecked);
    }

    const getRowState = (rowId: string) => {
        return selection()[rowId];
    }

    const toggleAllRows = () => {
        const data = selection();
        let allRowsChecked = Object.values(data).every(x => x);
        allRowsChecked = !allRowsChecked;
        setAllSelect(allRowsChecked);

        for (let i in data) {
            data[i] = allRowsChecked;
        }
        setSelection(data);
    }

    const getCanNextPage = () => {
        if (dataQuery.data) {
            return dataQuery.data.pageIndex + 1 < dataQuery.data.pageCount;
        }
        return false;
    }

    const getCanPreviousPage = () => {
        if (dataQuery.data) {
            return dataQuery.data.pageIndex > 0;
        }
        return false;
    }

    const testTable = () => {
        console.log('testTable');
    };

    return (
        <>
            <ControlBar onCreateProduct={testTable} />
            <div class="flex flex-col">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden shadow">
                            <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                <thead class="bg-gray-100 dark:bg-gray-700">
                                    <For each={table.getHeaderGroups()}>
                                        {headerGroup => (
                                            <tr class="text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                                <For each={headerGroup.headers}>
                                                    {header => (
                                                        <th class="p-4">
                                                            <Switch fallback={
                                                                header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )
                                                            }>
                                                                <Match when={header.column.id === "select"}>
                                                                    <div class="flex items-center">
                                                                        <input type="checkbox"
                                                                            onChange={() => toggleAllRows()}
                                                                            checked={allSelect()}
                                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                                    </div>
                                                                </Match>
                                                            </Switch>
                                                        </th>
                                                    )}
                                                </For>
                                            </tr>
                                        )}
                                    </For>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    <For each={table.getRowModel().rows}>
                                        {row => (
                                            <tr class="hover:bg-gray-100 dark:hover:bg-gray-700 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <For each={row.getVisibleCells()}>
                                                    {cell => (
                                                        <Switch fallback={
                                                            <td class={clsx('p-4', (cell.column.id === "description") && "max-w-sm overflow-hidden truncate")}>
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        }>
                                                            <Match when={cell.column.id === "select"}>
                                                                <td class="flex items-center p-4">
                                                                    <input type="checkbox"
                                                                        onChange={() => toggleRowSelection(cell)}
                                                                        checked={getRowState(cell.row.id)}
                                                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                                                </td>
                                                            </Match>
                                                        </Switch>
                                                    )}
                                                </For>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sticky bottom-0 right-0 w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
                <Button onClick={() => table.previousPage()}
                    disabled={!getCanPreviousPage()}>
                    <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Previous
                </Button>
                <div class="flex items-center justify-center px-4 h-10  text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Page {(dataQuery.data?.pageIndex ?? 0) + 1} of {dataQuery.data?.pageCount ?? 0}
                </div>
                <Button onClick={() => table.nextPage()}
                    disabled={!getCanNextPage()}>
                    Next
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Button>
                <PageSizeSelect onChange={(e: any) => {
                    table.setPageSize(Number(e.target.value));
                }} value={pagination().pageSize ?? 0} />
                {dataQuery.isFetching ? <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div> : null}
            </div>
        </>
    )
}

export default ProductPage;