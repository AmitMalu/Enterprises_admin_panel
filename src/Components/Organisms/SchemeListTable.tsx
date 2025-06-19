import { Group, Pagination, Table, Tooltip } from "@mantine/core";
import React from "react";
import TextComponent from "../Atoms/TextComponent";
import {
  columnStyles,
  SchemesListType,
} from "../../Config/Schemes/SchemesConfig";
import {
  DeleteIcon,
  EditIcon2,
  EyeIcon2,
  paginationBackIcon,
  paginationFrontIcon,
  SettingIcon2,
} from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { ellipsisCellStyle } from "../../Utils/utils";

interface SchemesListTableProps {
  data: SchemesListType[];
  headers: { key: keyof SchemesListType; label: string }[];
  page: number;
  pageSize: number;
  setPage?: (page: number) => void;
}

const SchemeListTable: React.FC<SchemesListTableProps> = ({
  data,
  headers,
  page,
  pageSize,
  setPage,
}) => {
  const navigate = useNavigate();
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const start = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(totalRecords, page * pageSize);
  const message = `Showing ${start} – ${end} of ${totalRecords} records`;
  const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);

  const rows = currentPageData.map((item, index) => (
    <Table.Tr key={index}>
      {headers.map(({ key }) => (
        <Table.Td
          key={key}
          style={{ ...ellipsisCellStyle, ...columnStyles[key] }}
        >
          <Tooltip
            arrowPosition="side"
            arrowSize={5}
            position="top-start"
            label={String(item[key as keyof SchemesListType])}
            withArrow
          >
            <span>{String(item[key as keyof SchemesListType])}</span>
          </Tooltip>
        </Table.Td>
      ))}

      <Table.Td>
        <div className="flex justify-center gap-2">
          <span
            onClick={() =>
              navigate(`/schemes/setting/${item.schemeId}`, { state: item })
            }
            className="cursor-pointer"
          >
            <SettingIcon2 />
          </span>
          <span className="cursor-pointer">
            <EyeIcon2 />
          </span>
          <span className="cursor-pointer">
            <DeleteIcon />
          </span>
          <span className="cursor-pointer">
            <EditIcon2 />
          </span>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={1000} style={{ marginTop: "20px" }}>
      <Table
        withColumnBorders
        style={{ borderRadius: 8, overflow: "hidden", background: "#fff" }}
        styles={{
          th: {
            background:
              "linear-gradient(180deg, rgba(2, 53, 91, 0.16) 60%, rgba(50, 47, 53, 0) 100%)",
            textAlign: "center",
            fontFamily: "Segoe UI",
            padding: "10px 6px",
            fontWeight: "bold",
            fontSize: 14,
            whiteSpace: "nowrap",
          },
          td: {
            textAlign: "center",
            fontSize: 14,
            padding: "10px 6px",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {headers.map(({ key, label }) => (
              <Table.Th key={key}>{label}</Table.Th>
            ))}
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Tfoot>
          <Table.Tr>
            <Table.Td colSpan={headers.length + 1}>
              <Group
                style={{
                  padding: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextComponent color="#667085" fontFamily="Inter" fontSize={14}>
                  {message}
                </TextComponent>

                <Pagination
                  total={totalPages}
                  onChange={setPage}
                  styles={{
                    control: {
                      borderColor: "#fff",
                    },
                  }}
                  color="#12B5F1"
                  size="sm"
                  radius="md"
                  previousIcon={paginationBackIcon}
                  nextIcon={paginationFrontIcon}
                />
              </Group>
            </Table.Td>
          </Table.Tr>
        </Table.Tfoot>
      </Table>
    </Table.ScrollContainer>
  );
};

export default SchemeListTable;
