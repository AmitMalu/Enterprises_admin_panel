import { Card, Table } from "@mantine/core";
import TextComponent from "../Atoms/TextComponent";

interface UserDetails {
    parentName?: string;
    userName?: string;
    mobileNumber?: string;
    email?: string;
    userType?: string;
    balance?: {
        main: number;
        settlement: number;
    };
}

interface Props {
    title?: string;
    userDetails: UserDetails;
}

export const UserMappingUserDetailsCard = ({ title = "User Details", userDetails }: Props) => {
    const {
        parentName = "-",
        userName = "-",
        mobileNumber = "-",
        email = "-",
        userType = "-",
        balance = { main: 0, settlement: 0 },
    } = userDetails;

    return (
        <Card shadow="lg" padding="xs" radius="md" withBorder mt="md" style={{ backgroundColor: "#F9FAFB" }}>
            <TextComponent fontWeight={600} fontSize="sm" mb="sm">
                {title}
            </TextComponent>

            <Table withColumnBorders>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td fw={500}>Parent Name</Table.Td>
                        <Table.Td>{parentName}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td w="40%" fw={500}>User Name</Table.Td>
                        <Table.Td>{userName}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td fw={500}>Mobile Number</Table.Td>
                        <Table.Td>{mobileNumber}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td fw={500}>Email</Table.Td>
                        <Table.Td>{email}</Table.Td>
                    </Table.Tr>

                    {/* <Table.Tr>
                        <Table.Td fw={500}>User Type</Table.Td>
                        <Table.Td>{userType}</Table.Td>
                    </Table.Tr> */}

                    <Table.Tr>
                        <Table.Td fw={500}>Balance</Table.Td>
                        <Table.Td>
                            Main: {balance.main} <br />
                            Settlement: {balance.settlement}
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Card>
    );
};
