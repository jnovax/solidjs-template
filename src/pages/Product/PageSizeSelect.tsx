import { Index, splitProps } from "solid-js"
import clsx from "clsx"

export default function PageSizeSelect(props) {
    const [local, others] = splitProps(props, ["class"])
    return (
        <select
            class={clsx("px-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                local.class)}
            {...others}
        >
            <Index each={[10, 20, 30, 40, 50]}>{(pageSize, i) =>
                <option value={pageSize()}>
                    Show {pageSize()}
                </option>
            }</Index>
        </select>
    )
}