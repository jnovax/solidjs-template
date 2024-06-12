import TextField from "../../components/forms/TextField"

const DemoForm = () => {
    return (
        <div class="p-4 bg-white block border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <TextField name="first_name" label="First Name" required />
                    </div>
                    <div>
                        <TextField name="last_name" label="Last name" required />
                    </div>
                    <div>
                        <TextField name="company" label="Company" required />
                    </div>
                    <div>
                        <TextField name="phone" label="Phone number" required />
                    </div>
                    <div>
                        <TextField name="website" label="Website URL" type="url" required />
                    </div>
                    <div>
                        <TextField name="visitors" label="Unique visitors (per month)" type="number" required />
                    </div>
                </div>
                <div class="mb-6">
                    <TextField name="email" label="Email address" type="email" required />
                </div>
                <div class="mb-6">
                    <TextField name="password" label="Password" type="password" required />
                </div>
                <div class="mb-6">
                    <TextField name="confirm_password" label="Confirm password" type="password" required />
                </div>
                <div class="flex items-start mb-6">
                    <div class="flex items-center">
                        <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 
            text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
            dark:bg-gray-700 dark:border-gray-600
              indeterminate:focus:after:w-[0.5rem] indeterminate:focus:after:rounded-none indeterminate:focus:after:border-[0.125rem] indeterminate:focus:after:border-b-0 indeterminate:focus:after:border-l-0 indeterminate:focus:after:border-r-0 dark:checked:border-primary dark:checked:bg-primary dark:indeterminate:border-primary dark:indeterminate:bg-primary" />
                        <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                    </div>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default DemoForm;