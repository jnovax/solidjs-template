import { TextField as KTextField } from '@kobalte/core';
import { Component } from 'solid-js';

type TextFieldProps = { label?: string, name: string, type?: 'text' | 'number' | 'password' | 'checkbox' | 'email' | 'url' | 'date' | 'time' | undefined, required?: boolean };

const TextField: Component<TextFieldProps> = ({ name, label, type = 'text', required = false }) => {
    return (
        <KTextField.Root name={name}>
            {label && <KTextField.Label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</KTextField.Label>}
            <KTextField.Input type={type} class={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${required ?? "required"}`} />
        </KTextField.Root>
    )
}

export default TextField;