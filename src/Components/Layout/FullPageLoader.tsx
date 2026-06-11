import { Center, Loader } from "@mantine/core";
import { colors } from "../../theme/colors";

const FullPageLoader = () => (
    <Center style={{ height: "100vh", width: "100vw" }}>
        <Loader color={colors.status.danger} size="xl" type="bars" />
    </Center>
);

export default FullPageLoader;
