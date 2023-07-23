import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import Navbar from "../pages/Layout/Navbar";
import Sidebar from "../pages/Layout/Sidebar";
import Footer from "../pages/Layout/Footer";

export default function RouteGuard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  createEffect(() => {
    if (!token) {
      navigate('/signin', { replace: true });
    }
  })

  return (
    <>
      <Navbar />
      <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}