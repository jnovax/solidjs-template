import clsx from 'clsx';
import { Component, JSX, splitProps } from 'solid-js';

interface TextFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    type?: 'text' | 'number' | 'password' | 'checkbox' | 'email' | 'url' | 'date' | 'time' | undefined;
    value?: string;
    error?: string;
    required?: boolean;
};

const TextField: Component<TextFieldProps> = (props) => {
    const [local, others] = splitProps(props, ['label', 'value', 'error', 'name', 'type', 'required', 'class']);
    return (
        <>
            {local.label && (
                <label for={local.name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {local.label} {local.required && <span>*</span>}
                </label>
            )}
            <input {...others}
                id={local.name}
                name={local.name}
                value={local.value || ''}
                aria-invalid={!!local.error}
                aria-errormessage={`${props.name}-error`}
                class={clsx("bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500", local.class)}
            />
            {props.error && <div id={`${props.name}-error`}>{props.error}</div>}
        </>
    )
}

export default TextField;