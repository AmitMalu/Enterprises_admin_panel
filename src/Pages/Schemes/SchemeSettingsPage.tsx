import React, { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { DeactivateIcon } from "../../assets/Icons";
import { Grid, Tabs } from "@mantine/core";
import SchemeConfigurationForm from "../../Components/Organisms/SchemeConfigurationForm";
import SlabStructureTab from "../../Components/Organisms/SlabStructureTab";

const SchemeSettingsPage = () => {
  const { schemeId } = useParams();
  const location = useLocation();
  const state = location.state;

  const [activeTab, setActiveTab] = useState<string>("slab-structure");

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Header Section */}
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
              type={state?.schemeCode ? state?.schemeCode : "Scheme Code"}
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
          className="overflow-auto max-h-[300px] md:max-h-[calc(100vh-150px)] scrollbar-hide"
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

            <Tabs.Panel value="slab-structure" pt="xs">
              <SlabStructureTab />
            </Tabs.Panel>

            <Tabs.Panel value="product-details" pt="xs">
              Product Details Content Here
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3.5, lg: 3.5 }}>
          <SchemeConfigurationForm />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SchemeSettingsPage;
