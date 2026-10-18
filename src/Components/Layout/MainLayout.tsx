import {
  AppShell,
  Burger,
  Drawer,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TopMenuBar from "./TopMenuBar";
import { useEffect } from "react";
import { logoutUser } from "../../Utils/utils";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchWalletBalance } from "../../Redux/Features/Auth/Thunk";
import { colors } from "../../theme/colors";

const MainLayout: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Close the mobile menu drawer after navigating
  useEffect(() => {
    close();
  }, [location.pathname]);

  // Fetch Wallet Balance
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userInfo") || "{}")?.hierarchyId || ""
    if (id) {
      dispatch(fetchWalletBalance(id))
    }
  }, [])

  // Clear justLoggedIn if user navigates to any route other than "/"
  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");

    if (justLoggedIn === "true" && location.pathname !== "/") {
      sessionStorage.removeItem("justLoggedIn");
    }
  }, [location.pathname]);

  // Show logout prompt only on browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const justLoggedIn = sessionStorage.getItem("justLoggedIn");

      if (justLoggedIn !== "true") {
        const confirmLogout = window.confirm(
          "Are you sure you want to logout?"
        );
        if (confirmLogout) {
          sessionStorage.removeItem("justLoggedIn");
          logoutUser(); // clearStorage + navigate to /login
        } else {
          // Prevent navigation by re-pushing current path
          navigate(location.pathname, { replace: true });
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate, location.pathname]);

  // Detect reload using performance.navigation
  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];

    if (navEntries.length > 0 && navEntries[0].type === "reload") {
      const justLoggedIn = sessionStorage.getItem("justLoggedIn");

      if (justLoggedIn !== "true") {
        sessionStorage.removeItem("justLoggedIn");
        logoutUser(); // logout after reload
      }
    }
  }, []);

  // Prevent browser hard reload and show logout prompt
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const intentionalLogout = sessionStorage.getItem("intentionalLogout");
      
      // Don't show prompt if logout is intentional
      if (intentionalLogout === "true") {
        // Clear the flag after using it
        sessionStorage.removeItem("intentionalLogout");
        return;
      }
      
      event.preventDefault();
      (event as any).returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <AppShell header={{ height: 112 }} padding="md">
      <AppShell.Header style={{ border: "none", backgroundColor: "transparent" }}>
        {/* Tier 1: dark brand bar */}
        <div className="h-16 bg-[#0f172a]">
          <Group h="100%" px="lg" wrap="nowrap" className="mx-auto max-w-[1600px]">
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" color="#cbd5e1" />
            <Navbar />
          </Group>
        </div>
        {/* Tier 2: horizontal menu */}
        <div className="h-12 border-b bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]" style={{ borderColor: colors.border.default }}>
          <div className="mx-auto h-full max-w-[1600px] px-3 hidden md:block">
            <TopMenuBar />
          </div>
        </div>
      </AppShell.Header>

      {/* Small screens: the full menu opens in a drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size={280}
        withCloseButton={false}
        padding="sm"
        hiddenFrom="md"
        styles={{ content: { backgroundColor: "var(--color-sidebar-bg)" } }}
      >
        <Sidebar />
      </Drawer>

      <AppShell.Main style={{ backgroundColor: colors.surface.app }}>
        <div className="mx-auto w-full max-w-[1600px]">
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
