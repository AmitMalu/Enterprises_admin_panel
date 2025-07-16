import {
  AppShell,
  Burger,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { logoutUser } from "../../Utils/utils";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchWalletBalance } from "../../Redux/Features/Auth/Thunk";

const MainLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="xs"
    >
      <AppShell.Header style={{ backgroundColor: "#F8F8F8" }}>
        <Group justify="between" style={{ flexWrap: "nowrap", width: "100%" }} h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Navbar />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm" style={{ backgroundColor: "#EBF7F6" }}>
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Sidebar />
        </Group>
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: "#F8F8F8" }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
