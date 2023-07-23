import { FormError, SubmitHandler, createForm, email, minLength, required } from "@modular-forms/solid";
import { A, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import TextField from "../../components/forms/TextField";

type LoginForm = {
    email: string;
    password: string;
}

const SignIn = () => {
    const [loginForm, { Form, Field }] = createForm<LoginForm>();
    const navigate = useNavigate();

    const handleSubmit: SubmitHandler<LoginForm> = (values, event) => {
        if (values.password === '123456') {
            sessionStorage.setItem('token', `Lam Nguyen|${values.email}`);
            navigate('/');
        }
        else {
            throw new FormError<LoginForm>('An error has occurred.');
        }
    }

    createEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/', { replace: true })
        }
    })

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Studio
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <Form onSubmit={handleSubmit} class={"space-y-4 md:space-y-6"}>
                            <Field name="email" validate={[required('Please enter your email'), email('The email format is not valid')]}>
                                {(field, props) => (
                                    <TextField {...props} label="Your Email" type="email" placeholder="name@company.com" value={field.value} error={field.error} required />
                                )}
                            </Field>
                            <Field name="password" validate={[required('Please enter your password'), minLength(6, 'Your password must have 6 chars or more')]} >
                                {(field, props) => (
                                    <TextField {...props} label="Password" type="password" placeholder="••••••••" value={field.value} error={field.error} required />
                                )}
                            </Field>
                            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <div>{loginForm.response.message}</div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn;