import { AppShell, Burger, Group, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import Sidebar from "../Organisms/Sidebar";
import Navbar from "../Organisms/Navbar";

const MainLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
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

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
