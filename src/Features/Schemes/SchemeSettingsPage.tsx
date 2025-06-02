import React, { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { DeactivateIcon } from "../../assets/Icons";
import { Grid, Table, Tabs, Tooltip } from "@mantine/core";
import { ellipsisCellStyle } from "../../Utils/utils";
import moment from "moment";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";
import SelectComponent from "../../Components/Atoms/SelectComponent";

const SchemeSettingsPage = () => {
  const { schemeId } = useParams();
  const location = useLocation();
  const state = location.state;

  const [activeTab, setActiveTab] = useState<string>("slab-structure");

  type slabStructureType = {
    slabStart: string;
    slabEnd: string;
    rateType: string;
    gross: string;
    im: string;
    r: string;
    new: string;
  };

  const data: slabStructureType[] = [
    {
      slabStart: moment().format("YYYY-MM-DD"),
      slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
      rateType: "12.2",
      gross: "NA",
      im: "NA",
      r: "NA",
      new: "NA",
    },
    {
      slabStart: moment().format("YYYY-MM-DD"),
      slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
      rateType: "12.2",
      gross: "NA",
      im: "NA",
      r: "NA",
      new: "NA",
    },
    {
      slabStart: moment().format("YYYY-MM-DD"),
      slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
      rateType: "12.2",
      gross: "NA",
      im: "NA",
      r: "NA",
      new: "NA",
    },
    {
      slabStart: moment().format("YYYY-MM-DD"),
      slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
      rateType: "12.2",
      gross: "NA",
      im: "NA",
      r: "NA",
      new: "NA",
    },
  ];

  const AMAXdata: slabStructureType[] = [];

  const AMAX2data: slabStructureType[] = [];

  const headers: { key: keyof slabStructureType; label: string }[] = [
    { key: "slabStart", label: "Slab Start" },
    { key: "slabEnd", label: "Slab End" },
    { key: "rateType", label: "Rate Type" },
    { key: "gross", label: "Gross" },
    { key: "im", label: "IM" },
    { key: "r", label: "R" },
    { key: "new", label: "New" },
  ];

  const rows = data.map((item, index) => (
    <Table.Tr key={index}>
      {headers.map(({ key }) => (
        <Table.Td key={key} style={ellipsisCellStyle}>
          <Tooltip
            arrowPosition="side"
            arrowSize={5}
            position="top-start"
            label={String(item[key as keyof slabStructureType])}
            withArrow
          >
            <span>{String(item[key as keyof slabStructureType])}</span>
          </Tooltip>
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <div className="flex justify-between">
        <div>
          {/* Heading */}
          <TextComponent
            color="#1D1F2C"
            fontFamily="Inter"
            fontWeight={600}
            fontSize={22}
          >
            {state?.schemeName ? state.schemeName : "Scheme Name"}
          </TextComponent>

          <div className="mt-2">
            <BreadCrumb
              type={state.schemeCode ? state.schemeCode : "Scheme Code"}
              text="PG"
              color="#12B5F1"
            />
          </div>
        </div>

        <div className="flex items-end">
          <ButtonComponent
            style={{ padding: "5px 10px", height: 40 }}
            radius={8}
            font="Inter"
            textColor="#fff"
            bgColor="#12B5F1"
            borderColor="#FFFFFF"
            fontSize="14"
            leftIcon={<DeactivateIcon />}
          >
            Deactivate
          </ButtonComponent>
        </div>
      </div>

      <Grid gutter="xl" className="flex flex-1 mt-4 ">
        <Grid.Col
          span={{ base: 12, md: 8.5, lg: 8.5 }}
          className="overflow-auto max-h-[calc(100vh-150px)] scrollbar-hide"
        >
          <Tabs
            variant="unstyled"
            onChange={(value) => {
              if (value) setActiveTab(value);
            }}
            defaultValue="slab-structure"
            value={activeTab}
            classNames={{
              list: "flex w-full border border-[#DCDCDC] overflow-hidden",
              tab: `
      text-sm font-medium px-4 py-2 transition-all cursor-pointer 
      data-[active=true]:bg-white data-[active=true]:text-[#12B5F1]
      data-[active=false]:bg-[#F7F7F7] data-[active=false]:text-[#3D3D3D]
    `,
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab
                style={{ borderRight: "1px solid #DCDCDC" }}
                value="slab-structure"
              >
                Slab Structure
              </Tabs.Tab>
              <Tabs.Tab value="product-details">Product Details</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="slab-structure" pt="md">
              {/* Heading */}
              <TextComponent
                color="#1D1F2C"
                fontFamily="Inter"
                fontWeight={500}
                fontSize={18}
              >
                Slab Structure Scheme
              </TextComponent>

              <Table.ScrollContainer
                minWidth={700}
                style={{ margin: "10px 0px 20px 0px" }}
              >
                <Table
                  withColumnBorders
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "#fff",
                  }}
                  styles={{
                    th: {
                      background:
                        "linear-gradient(180deg, rgba(2, 53, 91, 0.16) 60%, rgba(50, 47, 53, 0) 100%)",
                      textAlign: "center",
                      fontFamily: "Segoe UI",
                      padding: "6px",
                      fontWeight: "bold",
                      fontSize: 14,
                      whiteSpace: "nowrap", // prevent wrapping
                    },
                    td: {
                      textAlign: "center",
                      fontSize: 14,
                      padding: "6px",
                    },
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      {headers.map(({ key, label }) => (
                        <Table.Th key={key}>{label}</Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>

              {/* Heading */}
              <TextComponent
                color="#1D1F2C"
                fontFamily="Inter"
                fontWeight={500}
                fontSize={18}
              >
                Slab Structure AMAX Table 2
              </TextComponent>

              <Table.ScrollContainer
                minWidth={700}
                style={{ margin: "10px 0px 20px 0px" }}
              >
                <Table
                  withColumnBorders
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "#fff",
                  }}
                  styles={{
                    th: {
                      background:
                        "linear-gradient(180deg, rgba(2, 53, 91, 0.16) 60%, rgba(50, 47, 53, 0) 100%)",
                      textAlign: "center",
                      fontFamily: "Segoe UI",
                      padding: "6px",
                      fontWeight: "bold",
                      fontSize: 14,
                      whiteSpace: "nowrap", // prevent wrapping
                    },
                    td: {
                      textAlign: "center",
                      fontSize: 14,
                      padding: "6px",
                    },
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      {headers.map(({ key, label }) => (
                        <Table.Th key={key}>{label}</Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>

              {/* Heading */}
              <TextComponent
                color="#1D1F2C"
                fontFamily="Inter"
                fontWeight={500}
                fontSize={18}
              >
                Slab Structure AMAX Table 2
              </TextComponent>

              <Table.ScrollContainer
                minWidth={700}
                style={{ marginTop: "10px" }}
              >
                <Table
                  withColumnBorders
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "#fff",
                  }}
                  styles={{
                    th: {
                      background:
                        "linear-gradient(180deg, rgba(2, 53, 91, 0.16) 60%, rgba(50, 47, 53, 0) 100%)",
                      textAlign: "center",
                      fontFamily: "Segoe UI",
                      padding: "6px",
                      fontWeight: "bold",
                      fontSize: 14,
                      whiteSpace: "nowrap", // prevent wrapping
                    },
                    td: {
                      textAlign: "center",
                      fontSize: 14,
                      padding: "6px",
                    },
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      {headers.map(({ key, label }) => (
                        <Table.Th key={key}>{label}</Table.Th>
                      ))}
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Tabs.Panel>

            <Tabs.Panel value="product-details" pt="xs">
              Product Details Content Here
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3.5, lg: 3.5 }}>
          <TextComponent
            color="#1D1F2C"
            fontFamily="Inter"
            fontWeight={500}
            fontSize={18}
          >
            Scheme Configuration
          </TextComponent>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4 flex flex-col gap-4">
            <TextInputComponent
              name="slabSize"
              label="Slab Size"
              placeholder="10,00,00"
              onChange={() => {}}
              value=""
              size="sm"
            />

            <SelectComponent
              data={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              name="includingChargesInTotalAmount"
              label="Including Chargs in total Amount"
              placeholder="Select One"
              onChange={() => {}}
              value=""
              size="sm"
            />

            <SelectComponent
              data={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              size="sm"
              name="debitChargesOnTotalAmount"
              label="Debit Chargs on Total Amount"
              placeholder="Select One"
              onChange={() => {}}
              value=""
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SchemeSettingsPage;
