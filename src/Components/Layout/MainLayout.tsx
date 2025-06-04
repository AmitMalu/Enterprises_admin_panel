import { AppShell, Burger, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="xs"
    >
      <AppShell.Header style={{ backgroundColor: "#F8F8F8" }}>
        <Group h="100%" px="md">
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

      <AppShell.Main style={{ backgroundColor: "#F8F8F8"}}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
