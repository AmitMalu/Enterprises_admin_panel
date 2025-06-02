import React, { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import {
  AddIconSvg,
  DeleteIcon,
  EditIcon,
  EditIcon2,
  ExportIcon,
  EyeIcon,
  EyeIcon2,
  FilterIcon2,
  paginationBackIcon,
  paginationFrontIcon,
  SearchIcon,
  SelectDateIcon,
  SettingIcon2,
} from "../../assets/Icons";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import { Group, Pagination, Table, Tooltip } from "@mantine/core";
import {
  columnStyles,
  data,
  headers,
  SchemesListType,
} from "./SchemesListConfig";
import { ellipsisCellStyle } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";

const SchemesList = () => {
  const handleSearchChange = () => {};
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const totalRecords = data.length;
  const pageSize = 5;
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
    <div className="w-full min-h-[calc(100vh-90px)] flex flex-col p-2">
      <div className="flex justify-between">
        <div>
          {/* Heading */}
          <TextComponent
            color="#1D1F2C"
            fontFamily="Inter"
            fontWeight={600}
            fontSize={22}
          >
            Manager UI
          </TextComponent>

          {/* Sub Heading */}
          <div className="mt-2">
            <BreadCrumb type="Schemes List" text="Schemes" color="#12B5F1" />
          </div>
        </div>

        <div className="flex items-end">
          <ButtonComponent
            style={{ padding: "5px 14px", height: 40 }}
            radius={8}
            font="Inter"
            textColor="#fff"
            bgColor="#12B5F1"
            borderColor="#FFFFFF"
            fontSize="14"
            leftIcon={<AddIconSvg />}
          >
            Create New Scheme
          </ButtonComponent>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div className="border border-[#E0E2E7] rounded-md">
          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={6}
            font="Inter"
            textColor="#000000"
            bgColor="#E6EAED"
            fontSize="14"
            fw="600"
          >
            Scheme List
          </ButtonComponent>
        </div>

        <div className="flex gap-2 items-end">
          <TextInputComponent
            className="mb-1"
            name="search"
            placeholder="Search"
            value=""
            size="sm"
            onChange={handleSearchChange}
            leftSection={<SearchIcon />}
          />

          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={8}
            font="Inter"
            textColor="#667085"
            borderColor="#E0E2E7"
            bgColor="#fff"
            fontSize="14"
            fw="600"
            leftIcon={<SelectDateIcon />}
          >
            Select Date
          </ButtonComponent>

          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={8}
            font="Inter"
            textColor="#667085"
            borderColor="#E0E2E7"
            bgColor="#fff"
            fontSize="14"
            fw="600"
            leftIcon={<FilterIcon2 />}
          >
            Filter
          </ButtonComponent>

          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={8}
            font="Inter"
            textColor="#667085"
            borderColor="#E0E2E7"
            bgColor="#fff"
            fontSize="14"
            fw="600"
            leftIcon={<ExportIcon width={18} height={18} />}
          >
            Export
          </ButtonComponent>
        </div>
      </div>

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
              whiteSpace: "nowrap", // prevent wrapping
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
                  <TextComponent
                    color="#667085"
                    fontFamily="Inter"
                    fontSize={14}
                  >
                    {message}
                  </TextComponent>
                  <Pagination
                    total={totalPages}
                    onChange={setPage}
                    styles={{
                      control: {
                        borderColor: "#fff",
                        // backgroundColor: "#ECFAFF",
                        // color: "#12B5F1",
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
    </div>
  );
};

export default SchemesList;
