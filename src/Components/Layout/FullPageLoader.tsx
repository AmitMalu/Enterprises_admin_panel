import { Center, Loader } from "@mantine/core";

const FullPageLoader = () => (
    <Center style={{ height: "100vh", width: "100vw" }}>
        <Loader color="#BF0204" size="xl" type="bars" />
    </Center>
);

export default FullPageLoader;
