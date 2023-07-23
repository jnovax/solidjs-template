import { A } from "@solidjs/router";
import clsx from "clsx";
import { splitProps } from "solid-js";


const SideBarItem = (props) => {
    const [local, others] = splitProps(props, ['href', 'icon', 'value', 'class', 'indicator', 'indicatorClass']);

    return (
        <li>
            <A {...others} href={local.href}
                class={clsx("flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group", local.class)}>
                {local.icon && <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">{local.icon}</svg>}
                <span class="flex-1 ml-3 whitespace-nowrap">{local.value}</span>
                {local.indicator && <span class={clsx("inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium", local.indicatorClass)}>{local.indicator}</span>}
            </A>
        </li>
    )
}

export default SideBarItem;