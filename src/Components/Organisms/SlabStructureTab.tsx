import React from "react";
import SlabStructureTable from "./SlabStructureTable";
import {
  AMAX2data,
  AMAXdata,
  slabStructureData,
  slabStructureHeaders,
  slabStructureType,
} from "../../Config/Schemes/SchemesConfig";

const SlabStructureTab = () => {
  return (
    <>
      <SlabStructureTable<slabStructureType>
        label="Slab Structure Scheme"
        data={slabStructureData}
        headers={slabStructureHeaders}
      />

      <SlabStructureTable<slabStructureType>
        label="Slab Structure AMAX Table "
        data={AMAXdata}
        headers={slabStructureHeaders}
      />

      <SlabStructureTable<slabStructureType>
        label="Slab Structure AMAX Table 2"
        data={AMAX2data}
        headers={slabStructureHeaders}
      />
    </>
  );
};

export default SlabStructureTab;
