import clsx from "clsx";
import { splitProps } from "solid-js";

const Button = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <button
            {...others}
            class={clsx("flex items-center justify-center px-4 h-10 text-base font-medium rounded-lg",
                "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700",
                "dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:text-gray-400  dark:hover:text-white",
                "disabled:bg-white disabled:text-gray-300",
                "dark:disabled:bg-gray-800 dark:disabled:hover:text-gray-600 dark:disabled:text-gray-600 disabled:cursor-not-allowed",
                local.class)}>
            {local.children}
        </button>
    )
}

export default Button;