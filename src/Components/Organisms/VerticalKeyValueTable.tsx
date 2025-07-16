import { Skeleton, Table } from "@mantine/core";
import { formatDateTime, VerticalKeyValueTableProps } from "../../Utils/utils";

const VerticalKeyValueTable = <T extends Record<string, any>>({
    data,
    headers,
    loading,
}: VerticalKeyValueTableProps<T>) => {

    if (loading) {
        return (
            <Table striped withTableBorder withColumnBorders>
                <Table.Tbody>
                    {Array.from({ length: headers?.length || 5 }).map((_, i) => (
                        <Table.Tr key={i}>
                            <Table.Td className="font-bold w-1/3">
                                <Skeleton height={16} width="70%" />
                            </Table.Td>
                            <Table.Td className="w-2/3">
                                <Skeleton height={16} width="90%" />
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        );
    }

    if (!data || !headers || headers.length === 0) {
        return (
            <Table striped withTableBorder withColumnBorders>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td colSpan={2} className="text-center">
                            No data available
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        );
    }

    return (
        <Table striped withTableBorder withColumnBorders>
            <Table.Tbody>
                {headers.map(({ key, label }) => (
                    <Table.Tr key={String(key)}>
                        <Table.Td className="font-bold">{label}</Table.Td>
                        <Table.Td>{formatValue(String(key), data ? data[key] : "-")}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};

const formatValue = (key: string, val: any) => {
    if (val === null || val === undefined) return "-";

    if (key === "createdAt" || key === "editedAt") {
        return formatDateTime(val); // use your helper here
    }

    if (typeof val === "boolean") return val ? "Yes" : "No";

    return val.toString();
};

export default VerticalKeyValueTable;
