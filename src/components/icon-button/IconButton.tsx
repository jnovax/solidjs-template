import clsx from "clsx";
import { splitProps } from "solid-js";

const IconButton = (props) => {
    const [local, others] = splitProps(props, ['class', 'children']);

    return (
        <a
            {...others}
            class={clsx("inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100",
                "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                local.class)}>
            {local.children}
        </a>
    )
}

export default IconButton;