import { Component } from "solid-js";
import TextField from "./components/TextField";
import SignIn from "./pages/SignIn";
import { Checkbox } from "@kobalte/core";

const App: Component = () => (
  <div class="p-6 items-center justify-center mx-auto md:h-screen dark:bg-gray-900">
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
          <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
        </div>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
  // <SignIn />
);

export default App;