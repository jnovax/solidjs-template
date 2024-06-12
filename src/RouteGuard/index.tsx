import { Outlet, useBeforeLeave, useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import Navbar from "../pages/Layout/Navbar";
import Sidebar from "../pages/Layout/Sidebar";

export default function RouteGuard() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  createEffect(() => {
    if (!token) {
      navigate('/signin', { replace: true });
    }
  });

  const [sidebarCollapse, setSidebarCollapse] = createSignal(false, { equals: false });
  const toggleSideBar = () => {
    setSidebarCollapse(!sidebarCollapse());
  }

  useBeforeLeave(() => {
    if (!sidebarCollapse()) {
      toggleSideBar();
    }
  });

  return (
    <>
      <Navbar onToggleSideBar={() => toggleSideBar()} sideBarCollapsed={sidebarCollapse()} />
      <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar collapse={sidebarCollapse()} onCollapseChanged={() => toggleSideBar()} />
        <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}